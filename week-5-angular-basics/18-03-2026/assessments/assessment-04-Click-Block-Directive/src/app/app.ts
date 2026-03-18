import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { ClickBlockDirective } from './directives/click-block';

interface Action {
  label: string;
  icon: string;
  description: string;
  allowed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgClass, ClickBlockDirective],
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    :host {
      font-family: 'Inter', sans-serif;
      display: block;
      min-height: 100vh;
      background: #f5f6fa;
    }

    .page {
      max-width: 640px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    /* ── Header ── */
    .header { margin-bottom: 32px; }
    .header h1 {
      font-size: 24px;
      font-weight: 700;
      color: #111827;
    }
    .header p {
      margin-top: 6px;
      font-size: 14px;
      color: #6b7280;
      line-height: 1.6;
    }

    /* ── Master toggle card ── */
    .toggle-card {
      background: #fff;
      border: 1.5px solid #e5e7eb;
      border-radius: 14px;
      padding: 20px 24px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .toggle-info h3 {
      font-size: 15px;
      font-weight: 600;
      color: #111827;
    }
    .toggle-info p {
      font-size: 13px;
      color: #6b7280;
      margin-top: 3px;
    }

    /* ── Toggle switch ── */
    .switch {
      position: relative;
      width: 52px;
      height: 28px;
      flex-shrink: 0;
    }
    .switch input { display: none; }
    .slider {
      position: absolute;
      inset: 0;
      background: #e5e7eb;
      border-radius: 999px;
      cursor: pointer;
      transition: background .25s ease;
    }
    .slider::before {
      content: '';
      position: absolute;
      width: 20px; height: 20px;
      left: 4px; top: 4px;
      background: #fff;
      border-radius: 50%;
      transition: transform .25s ease;
      box-shadow: 0 1px 4px rgba(0,0,0,.2);
    }
    input:checked + .slider { background: #22c55e; }
    input:checked + .slider::before { transform: translateX(24px); }

    /* ── Status pill ── */
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: .04em;
      text-transform: uppercase;
      margin-left: 12px;
    }
    .status-pill.allowed {
      background: #f0fdf4;
      color: #16a34a;
      border: 1px solid #bbf7d0;
    }
    .status-pill.blocked {
      background: #fef2f2;
      color: #dc2626;
      border: 1px solid #fecaca;
    }
    .status-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
    }
    .status-pill.allowed .status-dot { background: #22c55e; }
    .status-pill.blocked .status-dot { background: #ef4444; }

    /* ── Section label ── */
    .section-label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .08em;
      text-transform: uppercase;
      color: #9ca3af;
      margin-bottom: 12px;
    }

    /* ── Action buttons grid ── */
    .actions-grid {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 28px;
    }

    .action-row {
      display: flex;
      align-items: center;
      gap: 14px;
      background: #fff;
      border: 1.5px solid #e5e7eb;
      border-radius: 12px;
      padding: 16px 18px;
      transition: box-shadow .15s ease;
    }
    .action-row:hover {
      box-shadow: 0 4px 16px rgba(0,0,0,.06);
    }

    .action-icon {
      font-size: 22px;
      width: 42px; height: 42px;
      display: flex; align-items: center; justify-content: center;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      flex-shrink: 0;
    }

    .action-text { flex: 1; }
    .action-text strong {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #111827;
    }
    .action-text span {
      font-size: 12px;
      color: #9ca3af;
      margin-top: 2px;
      display: block;
    }

    /* ── The actual button (directive applied here) ── */
    .action-btn {
      padding: 9px 20px;
      border-radius: 8px;
      border: none;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      background: #111827;
      color: #fff;
      transition: background .2s ease, transform .1s ease;
      white-space: nowrap;
    }
    .action-btn:hover { background: #374151; transform: translateY(-1px); }

    /* ── Toast notification ── */
    .toast {
      position: fixed;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%) translateY(80px);
      background: #111827;
      color: #fff;
      padding: 12px 24px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 8px 24px rgba(0,0,0,.2);
      transition: transform .3s ease, opacity .3s ease;
      opacity: 0;
      pointer-events: none;
      white-space: nowrap;
    }
    .toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }

    /* ── How it works box ── */
    .how-it-works {
      background: #fff;
      border: 1.5px solid #e5e7eb;
      border-radius: 14px;
      padding: 20px 24px;
    }
    .how-it-works h3 {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 14px;
    }
    .code-line {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin-bottom: 10px;
      font-size: 13px;
    }
    .code-pill {
      padding: 2px 10px;
      border-radius: 6px;
      font-family: monospace;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .code-pill.green { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
    .code-pill.red   { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
    .code-line p { color: #6b7280; line-height: 1.5; }
  `],
  template: `
    <div class="page">

      <!-- Header -->
      <div class="header">
        <h1>Click Block Directive</h1>
        <p>
          Toggle the switch to allow or block button interactions.<br>
          The <code style="background:#f3f4f6;padding:2px 6px;border-radius:4px;font-size:12px">appClickBlock</code>
          directive controls each button.
        </p>
      </div>

      <!-- Master Toggle -->
      <div class="toggle-card">
        <div class="toggle-info">
          <h3>
            Master Control
            <span class="status-pill" [ngClass]="isAllowed ? 'allowed' : 'blocked'">
              <span class="status-dot"></span>
              {{ isAllowed ? 'Allowed' : 'Blocked' }}
            </span>
          </h3>
          <p>Turn on to allow clicks. Turn off to block all buttons.</p>
        </div>
        <label class="switch">
          <input type="checkbox" [checked]="isAllowed" (change)="toggleAll()">
          <span class="slider"></span>
        </label>
      </div>

      <!-- Actions -->
      <div class="section-label">Actions</div>
      <div class="actions-grid">
        <div class="action-row" *ngFor="let action of actions">

          <div class="action-icon">{{ action.icon }}</div>

          <div class="action-text">
            <strong>{{ action.label }}</strong>
            <span>{{ action.description }}</span>
          </div>

          <!--
            appClickBlock directive applied here.
            Pass true  → click is allowed
            Pass false → click is blocked (pointer-events:none + opacity)
          -->
          <button
            class="action-btn"
            [appClickBlock]="isAllowed"
            (click)="onAction(action.label)"
          >
            {{ isAllowed ? 'Click Me' : 'Blocked' }}
          </button>

        </div>
      </div>

      <!-- How it works -->
      <div class="how-it-works">
        <h3>How the directive works</h3>
        <div class="code-line">
          <span class="code-pill green">true</span>
          <p>Click allowed — button is fully active, events fire normally.</p>
        </div>
        <div class="code-line">
          <span class="code-pill red">false</span>
          <p>Click blocked — <code style="font-size:11px">pointer-events:none</code> applied, opacity reduced, event stopped.</p>
        </div>
      </div>

    </div>

    <!-- Toast -->
    <div class="toast" [ngClass]="{ show: toastVisible }">
      ✅ {{ toastMessage }}
    </div>
  `
})
export class AppComponent {

  isAllowed: boolean = true;
  toastVisible: boolean = false;
  toastMessage: string = '';
  private toastTimer: any;

  actions: Action[] = [
    { label: 'Send Message',   icon: '✉️', description: 'Send a message to the team',   allowed: true },
    { label: 'Download File',  icon: '📥', description: 'Download the latest report',   allowed: true },
    { label: 'Delete Record',  icon: '🗑️', description: 'Permanently remove this item', allowed: true },
    { label: 'Save Changes',   icon: '💾', description: 'Save your current progress',   allowed: true },
  ];

  toggleAll() {
    this.isAllowed = !this.isAllowed;
  }

  onAction(label: string) {
    this.toastMessage = label + ' action triggered!';
    this.toastVisible = true;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toastVisible = false, 2500);
  }
}