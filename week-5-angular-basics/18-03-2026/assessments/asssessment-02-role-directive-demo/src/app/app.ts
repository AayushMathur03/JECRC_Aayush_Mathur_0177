import { Component, inject } from '@angular/core';
import { AuthService, UserRole } from './services/auth';
import { RoleDirective } from './directives/role';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RoleDirective, TitleCasePipe],
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    :host {
      --bg:        #0b0c10;
      --surface:   #13151c;
      --surface2:  #1c1f2b;
      --border:    #2a2d3e;
      --accent:    #6c63ff;
      --accent2:   #ff6584;
      --green:     #00e5a0;
      --amber:     #ffbe55;
      --text:      #e8eaf6;
      --muted:     #6b7280;
      font-family: 'DM Sans', sans-serif;
      display: block;
      min-height: 100vh;
      background: var(--bg);
      color: var(--text);
    }

    .page {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px 24px;
      background:
        radial-gradient(ellipse 60% 40% at 20% 10%, rgba(108,99,255,.12) 0%, transparent 60%),
        radial-gradient(ellipse 50% 35% at 80% 90%, rgba(255,101,132,.08) 0%, transparent 60%),
        var(--bg);
    }

    /* ── Header ── */
    .header {
      text-align: center;
      margin-bottom: 48px;
    }
    .header h1 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(28px, 5vw, 44px);
      font-weight: 800;
      letter-spacing: -1px;
      background: linear-gradient(135deg, #fff 30%, var(--accent));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.15;
    }
    .header p {
      margin-top: 10px;
      color: var(--muted);
      font-size: 15px;
      font-weight: 300;
    }

    /* ── Badge (live role indicator) ── */
    .role-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 18px;
      padding: 6px 16px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--surface);
      font-size: 13px;
      font-weight: 500;
      letter-spacing: .04em;
      text-transform: uppercase;
      transition: all .3s ease;
    }
    .role-badge .dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
      animation: pulse 2s infinite;
    }
    .role-badge.admin  { border-color: rgba(108,99,255,.5); color: #a89dff; }
    .role-badge.admin  .dot { background: var(--accent); }
    .role-badge.user   { border-color: rgba(0,229,160,.4); color: #4effc5; }
    .role-badge.user   .dot { background: var(--green); }
    .role-badge.guest  { border-color: rgba(107,114,128,.4); color: var(--muted); }
    .role-badge.guest  .dot { background: var(--muted); }

    @keyframes pulse {
      0%,100% { opacity: 1; transform: scale(1); }
      50%      { opacity: .5; transform: scale(.8); }
    }

    /* ── Main card ── */
    .card {
      width: 100%;
      max-width: 560px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 24px 64px rgba(0,0,0,.4);
    }

    /* ── Role switcher tabs ── */
    .role-switcher {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      border-bottom: 1px solid var(--border);
    }
    .role-btn {
      padding: 16px 8px;
      font-family: 'Syne', sans-serif;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: .05em;
      text-transform: uppercase;
      background: transparent;
      color: var(--muted);
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      transition: all .25s ease;
      position: relative;
    }
    .role-btn:hover { color: var(--text); background: var(--surface2); }
    .role-btn.active-admin  { color: #a89dff; border-bottom-color: var(--accent); background: rgba(108,99,255,.06); }
    .role-btn.active-user   { color: #4effc5; border-bottom-color: var(--green);  background: rgba(0,229,160,.06); }
    .role-btn.active-guest  { color: var(--muted); border-bottom-color: var(--muted); background: rgba(255,255,255,.03); }

    /* ── Content area ── */
    .content {
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-height: 280px;
    }

    /* ── Admin panel ── */
    .admin-panel {
      background: linear-gradient(135deg, rgba(108,99,255,.1), rgba(108,99,255,.04));
      border: 1px solid rgba(108,99,255,.25);
      border-radius: 14px;
      padding: 24px;
      animation: fadeSlide .35s ease;
    }
    .admin-panel .panel-label {
      font-family: 'Syne', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .admin-panel .panel-label::before {
      content: '';
      display: inline-block;
      width: 14px; height: 14px;
      background: var(--accent);
      mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E") center/contain no-repeat;
      -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E") center/contain no-repeat;
    }
    .admin-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .action-btn {
      padding: 12px 16px;
      border-radius: 10px;
      border: 1px solid rgba(108,99,255,.3);
      background: rgba(108,99,255,.12);
      color: #c4bfff;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all .2s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .action-btn:hover {
      background: rgba(108,99,255,.25);
      border-color: rgba(108,99,255,.6);
      color: #fff;
      transform: translateY(-1px);
    }
    .action-btn.danger {
      border-color: rgba(255,101,132,.3);
      background: rgba(255,101,132,.1);
      color: #ffa0b4;
    }
    .action-btn.danger:hover {
      background: rgba(255,101,132,.22);
      border-color: rgba(255,101,132,.6);
      color: #fff;
    }
    .icon { font-size: 15px; }

    /* ── User panel ── */
    .user-panel {
      background: linear-gradient(135deg, rgba(0,229,160,.08), rgba(0,229,160,.02));
      border: 1px solid rgba(0,229,160,.2);
      border-radius: 14px;
      padding: 24px;
      animation: fadeSlide .35s ease;
    }
    .user-panel .panel-label {
      font-family: 'Syne', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
      color: var(--green);
      margin-bottom: 14px;
    }
    .user-welcome {
      font-size: 22px;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      color: #fff;
    }
    .user-sub {
      margin-top: 6px;
      font-size: 14px;
      color: var(--muted);
      line-height: 1.6;
    }
    .user-stats {
      margin-top: 16px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
    .stat {
      background: rgba(0,229,160,.07);
      border: 1px solid rgba(0,229,160,.15);
      border-radius: 10px;
      padding: 12px 10px;
      text-align: center;
    }
    .stat-num {
      font-family: 'Syne', sans-serif;
      font-size: 20px;
      font-weight: 800;
      color: var(--green);
    }
    .stat-label {
      font-size: 11px;
      color: var(--muted);
      margin-top: 2px;
    }

    /* ── Guest panel ── */
    .guest-panel {
      background: rgba(255,255,255,.03);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 28px;
      text-align: center;
      animation: fadeSlide .35s ease;
    }
    .guest-icon {
      font-size: 36px;
      margin-bottom: 12px;
      opacity: .5;
    }
    .guest-panel h3 {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 18px;
      color: var(--muted);
    }
    .guest-panel p {
      font-size: 13px;
      color: #4b5563;
      margin-top: 8px;
      line-height: 1.6;
    }
    .guest-login-btn {
      margin-top: 20px;
      padding: 10px 28px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: var(--surface2);
      color: var(--muted);
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      cursor: pointer;
      transition: all .2s ease;
    }
    .guest-login-btn:hover { color: var(--text); border-color: #4b5563; }

    /* ── Footer hint ── */
    .card-footer {
      padding: 14px 32px;
      border-top: 1px solid var(--border);
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #374151;
    }
    .lock-icon {
      width: 12px; height: 12px;
      opacity: .4;
    }

    @keyframes fadeSlide {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `],
  template: `
    <div class="page">

      <!-- Header -->
      <div class="header">
        <h1>Role-Based Access</h1>
        <p>Elements render based on the active user role</p>
        <div class="role-badge" [class]="authService.role()">
          <span class="dot"></span>
          {{ authService.role() | titlecase }}
        </div>
      </div>

      <!-- Card -->
      <div class="card">

        <!-- Role Switcher -->
        <div class="role-switcher">
          <button class="role-btn"
            [class.active-admin]="authService.role() === 'admin'"
            (click)="setRole('admin')">
            ★ Admin
          </button>
          <button class="role-btn"
            [class.active-user]="authService.role() === 'user'"
            (click)="setRole('user')">
            ◎ User
          </button>
          <button class="role-btn"
            [class.active-guest]="authService.role() === 'guest'"
            (click)="setRole('guest')">
            ○ Guest
          </button>
        </div>

        <!-- Content -->
        <div class="content">

          <!-- ADMIN only -->
          <div class="admin-panel" *appRole="'admin'">
            <div class="panel-label">Admin Control Panel</div>
            <div class="admin-grid">
              <button class="action-btn" (click)="notify('Users managed')">
                <span class="icon">👥</span> Manage Users
              </button>
              <button class="action-btn" (click)="notify('Settings opened')">
                <span class="icon">⚙️</span> Settings
              </button>
              <button class="action-btn" (click)="notify('Report generated')">
                <span class="icon">📊</span> View Reports
              </button>
              <button class="action-btn danger" (click)="notify('Record deleted!')">
                <span class="icon">🗑️</span> Delete Record
              </button>
            </div>
          </div>

          <!-- USER only -->
          <div class="user-panel" *appRole="'user'">
            <div class="panel-label">◎ User Dashboard</div>
            <div class="user-welcome">Welcome back!</div>
            <div class="user-sub">
              Here's a summary of your account activity this month.
            </div>
            <div class="user-stats">
              <div class="stat">
                <div class="stat-num">24</div>
                <div class="stat-label">Projects</div>
              </div>
              <div class="stat">
                <div class="stat-num">8</div>
                <div class="stat-label">Tasks</div>
              </div>
              <div class="stat">
                <div class="stat-num">3</div>
                <div class="stat-label">Messages</div>
              </div>
            </div>
          </div>

          <!-- GUEST only -->
          <div class="guest-panel" *appRole="'guest'">
            <div class="guest-icon">🔒</div>
            <h3>Limited Access</h3>
            <p>You're browsing as a guest.<br>Sign in to unlock your dashboard.</p>
            <button class="guest-login-btn" (click)="notify('Redirecting to login...')">
              Sign In
            </button>
          </div>

        </div>

        <!-- Footer -->
        <div class="card-footer">
          <svg class="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Content visibility controlled by <strong>&nbsp;*appRole&nbsp;</strong> structural directive
        </div>

      </div>
    </div>
  `
})
export class AppComponent {
  authService = inject(AuthService);

  setRole(role: UserRole) {
    this.authService.setRole(role);
  }

  notify(msg: string) {
    alert(msg);
  }
}