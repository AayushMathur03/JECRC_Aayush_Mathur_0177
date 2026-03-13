// ===== ES6 Module: Main App =====
import {
  loginStudent, getDepartments,
  getCourses, createCourse, updateCourse, deleteCourse,
  getMyEnrollments, getAllEnrollments, enrollCourse, dropCourse
} from './api.js';

// ===== State =====
let currentUser = null;
let enrolledCourseIds = new Set();
let departments = [];
let toastTimer = null;

// ===== DOM =====
const $ = (id) => document.getElementById(id);
const loginScreen  = $('login-screen');
const app          = $('app');
const loginSelect  = $('login-select');
const loginBtn     = $('login-btn');
const loginError   = $('login-error');
const mainNav      = $('main-nav');
const courseGrid   = $('course-grid');
const enrollGrid   = $('enrollment-grid');
const adminCGrid   = $('admin-course-grid');
const historyBody  = $('history-body');
const searchInput  = $('search-input');
const deptFilter   = $('dept-filter');
const courseCount  = $('course-count');
const toast        = $('toast');
const modalOverlay = $('modal-overlay');
const modalContent = $('modal-content');
const modalClose   = $('modal-close');

// ===== Toast =====
const showToast = (msg, type = 'success') => {
  clearTimeout(toastTimer);
  const icons = { success: '✅', error: '❌', warning: '⚠️' };
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 3500);
};

// ===== Modal =====
const openModal = (html) => {
  modalContent.innerHTML = html;
  modalOverlay.classList.remove('hidden');
};
const closeModal = () => modalOverlay.classList.add('hidden');
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

// ===== Seats helpers =====
const seatsInfo = (enrolled, total) => {
  const pct = total > 0 ? Math.round((enrolled / total) * 100) : 0;
  const available = total - enrolled;
  const cls = pct >= 100 ? 'full' : pct >= 80 ? 'almost-full' : '';
  return { pct, available, cls };
};

// ===== Render Course Card (Browse) =====
const renderCourseCard = (course) => {
  const isEnrolled = enrolledCourseIds.has(course.courseId);
  const { pct, available, cls } = seatsInfo(course.enrolledCount, course.totalSeats);
  const full = available <= 0;

  const card = document.createElement('div');
  card.className = 'course-card';
  card.innerHTML = `
    <div class="card-header">
      <span class="card-category">${course.departmentName}</span>
      <div class="card-title">${course.courseName}</div>
    </div>
    <div class="card-body">
      <div class="card-meta">
        <span>🎓 ${course.credits} Credits</span>
        <span>👥 ${course.totalSeats} Seats</span>
        <span>${full ? '❌ Full' : `✅ ${available} left`}</span>
      </div>
      <div class="seats-bar-wrap">
        <div class="seats-label">
          <span>Enrollment</span>
          <span>${course.enrolledCount}/${course.totalSeats}</span>
        </div>
        <div class="seats-bar"><div class="seats-fill ${cls}" style="width:${pct}%"></div></div>
      </div>
    </div>
    <div class="card-footer">
      ${isEnrolled
        ? `<span class="enrolled-badge">✓ Enrolled</span>
           <button class="btn btn-danger" data-action="drop" data-id="${course.courseId}">Drop</button>`
        : `<button class="btn btn-primary" data-action="enroll" data-id="${course.courseId}" ${full ? 'disabled' : ''}>
             ${full ? 'Full' : '+ Enroll'}
           </button>`
      }
      <button class="btn btn-outline" data-action="details" data-course='${JSON.stringify(course)}'>Details</button>
    </div>`;

  card.querySelector('[data-action="enroll"]')?.addEventListener('click', async (e) => {
    e.stopPropagation();
    const btn = e.currentTarget;
    btn.disabled = true; btn.textContent = 'Enrolling...';
    try {
      await enrollCourse(currentUser.studentId, course.courseId);
      showToast(`Enrolled in "${course.courseName}"!`);
      await refreshAll();
    } catch (err) {
      showToast(err.message, 'error');
      btn.disabled = false; btn.textContent = '+ Enroll';
    }
  });

  card.querySelector('[data-action="drop"]')?.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (!confirm(`Drop "${course.courseName}"?`)) return;
    try {
      await dropCourse(currentUser.studentId, course.courseId);
      showToast(`Dropped "${course.courseName}"`, 'warning');
      await refreshAll();
    } catch (err) { showToast(err.message, 'error'); }
  });

  card.querySelector('[data-action="details"]').addEventListener('click', (e) => {
    e.stopPropagation();
    openCourseModal(JSON.parse(e.currentTarget.dataset.course));
  });

  card.addEventListener('click', () => openCourseModal(course));
  return card;
};

// ===== Course Detail Modal =====
const openCourseModal = (course) => {
  const isEnrolled = enrolledCourseIds.has(course.courseId);
  const { pct, available, cls } = seatsInfo(course.enrolledCount, course.totalSeats);
  const full = available <= 0;

  openModal(`
    <div class="modal-header">
      <span class="card-category">${course.departmentName}</span>
      <div class="modal-title">${course.courseName}</div>
    </div>
    <div class="modal-body">
      <div class="modal-detail">
        <div class="detail-item"><div class="label">Department</div><div class="value">${course.departmentName}</div></div>
        <div class="detail-item"><div class="label">Credits</div><div class="value">🎓 ${course.credits}</div></div>
        <div class="detail-item"><div class="label">Total Seats</div><div class="value">👥 ${course.totalSeats}</div></div>
        <div class="detail-item"><div class="label">Available</div><div class="value">${full ? '❌ Full' : `✅ ${available} seats`}</div></div>
      </div>
      <div class="seats-bar-wrap" style="margin-bottom:20px">
        <div class="seats-label"><span>Enrollment Progress</span><span>${course.enrolledCount}/${course.totalSeats} (${pct}%)</span></div>
        <div class="seats-bar" style="height:8px"><div class="seats-fill ${cls}" style="width:${pct}%"></div></div>
      </div>
      <div class="modal-actions">
        ${isEnrolled
          ? `<button class="btn btn-danger" id="m-drop">Drop Course</button>`
          : `<button class="btn btn-primary" id="m-enroll" ${full ? 'disabled' : ''}>${full ? 'No Seats Available' : '+ Enroll Now'}</button>`
        }
        <button class="btn btn-outline" id="m-close">Close</button>
      </div>
    </div>`);

  document.getElementById('m-close').onclick = closeModal;
  document.getElementById('m-enroll')?.addEventListener('click', async () => {
    try {
      await enrollCourse(currentUser.studentId, course.courseId);
      showToast(`Enrolled in "${course.courseName}"!`);
      closeModal(); await refreshAll();
    } catch (err) { showToast(err.message, 'error'); }
  });
  document.getElementById('m-drop')?.addEventListener('click', async () => {
    if (!confirm(`Drop "${course.courseName}"?`)) return;
    try {
      await dropCourse(currentUser.studentId, course.courseId);
      showToast(`Dropped "${course.courseName}"`, 'warning');
      closeModal(); await refreshAll();
    } catch (err) { showToast(err.message, 'error'); }
  });
};

// ===== Render Enrollment Card =====
const renderEnrollCard = (e) => {
  const { pct, cls } = seatsInfo(e.enrolledCount, e.totalSeats);
  const date = new Date(e.enrollmentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const card = document.createElement('div');
  card.className = 'course-card';
  card.innerHTML = `
    <div class="card-header">
      <span class="card-category">${e.departmentName}</span>
      <div class="card-title">${e.courseName}</div>
    </div>
    <div class="card-body">
      <div class="card-meta">
        <span>🎓 ${e.credits} Credits</span>
        <span>📅 ${date}</span>
      </div>
      <div class="seats-bar-wrap">
        <div class="seats-label"><span>Enrollment</span><span>${e.enrolledCount}/${e.totalSeats}</span></div>
        <div class="seats-bar"><div class="seats-fill ${cls}" style="width:${pct}%"></div></div>
      </div>
    </div>
    <div class="card-footer">
      <button class="btn btn-danger" data-id="${e.courseId}">Drop Course</button>
    </div>`;

  card.querySelector('.btn-danger').addEventListener('click', async (ev) => {
    ev.stopPropagation();
    if (!confirm(`Drop "${e.courseName}"?`)) return;
    try {
      await dropCourse(currentUser.studentId, e.courseId);
      showToast(`Dropped "${e.courseName}"`, 'warning');
      await refreshAll();
    } catch (err) { showToast(err.message, 'error'); }
  });

  return card;
};

// ===== Admin: Course Card =====
const renderAdminCard = (course) => {
  const card = document.createElement('div');
  card.className = 'course-card';
  card.innerHTML = `
    <div class="card-header">
      <span class="card-category">${course.departmentName}</span>
      <div class="card-title">${course.courseName}</div>
    </div>
    <div class="card-body">
      <div class="card-meta">
        <span>🎓 ${course.credits} Credits</span>
        <span>👥 ${course.enrolledCount}/${course.totalSeats}</span>
        <span>${course.seatsAvailable ? '✅ Open' : '❌ Full'}</span>
      </div>
    </div>
    <div class="card-footer">
      <button class="btn btn-admin" data-action="edit" data-course='${JSON.stringify(course)}'>✏️ Edit</button>
      <button class="btn btn-danger" data-action="del" data-id="${course.courseId}" data-name="${course.courseName}">🗑 Delete</button>
    </div>`;

  card.querySelector('[data-action="edit"]').addEventListener('click', (e) => {
    e.stopPropagation();
    openCourseForm(JSON.parse(e.currentTarget.dataset.course));
  });

  card.querySelector('[data-action="del"]').addEventListener('click', async (e) => {
    e.stopPropagation();
    const { id, name } = e.currentTarget.dataset;
    if (!confirm(`Delete course "${name}"? This cannot be undone.`)) return;
    try {
      await deleteCourse(parseInt(id));
      showToast(`Deleted "${name}"`, 'warning');
      await loadAdminCourses();
    } catch (err) { showToast(err.message, 'error'); }
  });

  return card;
};

// ===== Admin: Course Form Modal =====
const openCourseForm = (course = null) => {
  const isEdit = course !== null;
  const deptOptions = departments
    .map(d => `<option value="${d.departmentId}" ${isEdit && course.departmentId === d.departmentId ? 'selected' : ''}>${d.departmentName}</option>`)
    .join('');

  openModal(`
    <div class="modal-header" style="background: var(--admin-light);">
      <div class="modal-title" style="color:var(--admin)">${isEdit ? '✏️ Edit Course' : '➕ Add New Course'}</div>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label>Course Name</label>
        <input type="text" id="f-name" value="${isEdit ? course.courseName : ''}" placeholder="e.g. Data Structures" />
      </div>
      <div class="form-group">
        <label>Department</label>
        <select id="f-dept">${deptOptions}</select>
      </div>
      <div class="form-group">
        <label>Credits</label>
        <input type="number" id="f-credits" value="${isEdit ? course.credits : 3}" min="1" max="6" />
      </div>
      <div class="form-group">
        <label>Total Seats</label>
        <input type="number" id="f-seats" value="${isEdit ? course.totalSeats : 30}" min="1" max="200" />
      </div>
      <div class="modal-actions">
        <button class="btn btn-primary" id="f-save">${isEdit ? 'Update Course' : 'Add Course'}</button>
        <button class="btn btn-outline" id="f-cancel">Cancel</button>
      </div>
    </div>`);

  document.getElementById('f-cancel').onclick = closeModal;
  document.getElementById('f-save').addEventListener('click', async () => {
    const dto = {
      courseName:   document.getElementById('f-name').value.trim(),
      departmentId: parseInt(document.getElementById('f-dept').value),
      credits:      parseInt(document.getElementById('f-credits').value),
      totalSeats:   parseInt(document.getElementById('f-seats').value)
    };

    if (!dto.courseName) { showToast('Course name is required', 'error'); return; }

    try {
      if (isEdit) {
        await updateCourse(course.courseId, dto);
        showToast(`Updated "${dto.courseName}"`);
      } else {
        await createCourse(dto);
        showToast(`Added "${dto.courseName}"!`);
      }
      closeModal();
      await loadAdminCourses();
    } catch (err) { showToast(err.message, 'error'); }
  });
};

// ===== Grid helpers =====
const showLoading = (grid) => {
  grid.innerHTML = `<div class="loading"><div class="spinner"></div>Loading...</div>`;
};

const renderGrid = (grid, items, renderer, emptyMsg) => {
  grid.innerHTML = '';
  if (!items.length) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-icon">📭</div><h3>${emptyMsg}</h3></div>`;
    return;
  }
  // ES6: map() to build cards, then append
  items.map(renderer).forEach(card => grid.appendChild(card));
};

// ===== Load Functions =====
const loadCourses = async () => {
  showLoading(courseGrid);
  const search = searchInput.value.trim();
  const deptId = deptFilter.value;
  const courses = await getCourses(search, deptId);
  renderGrid(courseGrid, courses, renderCourseCard, 'No courses found');
  courseCount.textContent = `Showing ${courses.length} course${courses.length !== 1 ? 's' : ''}`;
};

const loadEnrollments = async () => {
  showLoading(enrollGrid);
  const enrollments = await getMyEnrollments(currentUser.studentId);
  enrolledCourseIds = new Set(enrollments.map(e => e.courseId));  // ES6: map()
  renderGrid(enrollGrid, enrollments, renderEnrollCard, 'You are not enrolled in any courses yet');
};

const loadAdminCourses = async () => {
  showLoading(adminCGrid);
  const courses = await getCourses();
  renderGrid(adminCGrid, courses, renderAdminCard, 'No courses found');
};

const loadHistory = async () => {
  const all = await getAllEnrollments();
  historyBody.innerHTML = all.length
    ? all.map((e, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${e.studentName}</td>
          <td>${e.courseName}</td>
          <td>${e.departmentName}</td>
          <td>${new Date(e.enrollmentDate).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' })}</td>
          <td>${e.dropDate ? new Date(e.dropDate).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' }) : '—'}</td>
          <td><span class="badge ${e.isActive ? 'badge-active' : 'badge-dropped'}">${e.isActive ? 'Active' : 'Dropped'}</span></td>
        </tr>`).join('')  // ES6: template literals + map()
    : `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--gray-400)">No enrollment records found</td></tr>`;
};

const refreshAll = async () => {
  await Promise.all([loadEnrollments(), loadCourses()]);
};

// ===== Departments =====
const loadDepartments = async () => {
  departments = await getDepartments();
  deptFilter.innerHTML = `<option value="">All</option>` +
    departments.map(d => `<option value="${d.departmentId}">${d.departmentName}</option>`).join('');
};

// ===== Tab Navigation =====
const showTab = (tabName) => {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`tab-${tabName}`)?.classList.add('active');
  document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
};

mainNav.addEventListener('click', async (e) => {
  const btn = e.target.closest('.nav-btn');
  if (!btn) return;
  const tab = btn.dataset.tab;
  showTab(tab);
  if (tab === 'enrolled') await loadEnrollments();
  else if (tab === 'courses') await loadCourses();
  else if (tab === 'admin-courses') await loadAdminCourses();
  else if (tab === 'admin-history') await loadHistory();
});

// ===== Admin Nav Buttons =====
const injectAdminTabs = () => {
  const adminBtns = `
    <button class="nav-btn admin-tab" data-tab="admin-courses">Manage Courses</button>
    <button class="nav-btn admin-tab" data-tab="admin-history">Enrollment History</button>`;
  mainNav.insertAdjacentHTML('beforeend', adminBtns);
};

// ===== Add Course Button =====
$('add-course-btn').addEventListener('click', () => openCourseForm());

// ===== Search =====
let debounce;
searchInput.addEventListener('input', () => {
  clearTimeout(debounce);
  debounce = setTimeout(loadCourses, 350);
});
$('clear-search').addEventListener('click', () => { searchInput.value = ''; loadCourses(); });
deptFilter.addEventListener('change', loadCourses);

// ===== Login =====
loginBtn.addEventListener('click', async () => {
  const email = loginSelect.value;
  if (!email) { loginError.textContent = 'Please select an account'; loginError.classList.remove('hidden'); return; }
  loginError.classList.add('hidden');
  loginBtn.disabled = true; loginBtn.textContent = 'Logging in...';
  try {
    const user = await loginStudent(email);
    currentUser = user;

    // Update header
    $('user-name').textContent = user.name;
    $('user-role').textContent = user.role;
    $('user-avatar').textContent = user.name[0].toUpperCase();

    if (user.role === 'Admin') injectAdminTabs();

    loginScreen.classList.add('hidden');
    app.classList.remove('hidden');

    await loadDepartments();
    await Promise.all([loadEnrollments(), loadCourses()]);
  } catch (err) {
    loginError.textContent = err.message;
    loginError.classList.remove('hidden');
  } finally {
    loginBtn.disabled = false; loginBtn.textContent = 'Login';
  }
});

// ===== Logout =====
$('logout-btn').addEventListener('click', () => {
  currentUser = null;
  enrolledCourseIds = new Set();
  // Remove admin tabs
  document.querySelectorAll('.admin-tab').forEach(b => b.remove());
  showTab('courses');
  app.classList.add('hidden');
  loginScreen.classList.remove('hidden');
  loginSelect.value = '';
});
