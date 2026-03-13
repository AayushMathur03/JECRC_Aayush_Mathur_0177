// ===== API Module (ES6 Module) =====
const BASE = 'http://localhost:5124/api';

const request = async (url, options = {}) => {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
};

// Students
export const loginStudent = (email) =>
  request(`${BASE}/students/login`, { method: 'POST', body: JSON.stringify({ email }) });

export const getStudents = () => request(`${BASE}/students`);

// Departments
export const getDepartments = () => request(`${BASE}/departments`);

// Courses (FR1 – FR5)
export const getCourses = (search = '', departmentId = '') => {
  const params = new URLSearchParams();
  if (search)       params.set('search', search);
  if (departmentId) params.set('departmentId', departmentId);
  return request(`${BASE}/courses?${params}`);
};

export const getCourse = (id) => request(`${BASE}/courses/${id}`);

export const createCourse = (dto) =>
  request(`${BASE}/courses`, { method: 'POST', body: JSON.stringify(dto) });

export const updateCourse = (id, dto) =>
  request(`${BASE}/courses/${id}`, { method: 'PUT', body: JSON.stringify(dto) });

export const deleteCourse = (id) =>
  request(`${BASE}/courses/${id}`, { method: 'DELETE' });

// Enrollments (FR6 – FR8)
export const getMyEnrollments = (studentId) =>
  request(`${BASE}/enrollments/student/${studentId}`);

export const getAllEnrollments = () => request(`${BASE}/enrollments`);

export const enrollCourse = (studentId, courseId) =>
  request(`${BASE}/enrollments`, { method: 'POST', body: JSON.stringify({ studentId, courseId }) });

export const dropCourse = (studentId, courseId) =>
  request(`${BASE}/enrollments/drop`, { method: 'DELETE', body: JSON.stringify({ studentId, courseId }) });
