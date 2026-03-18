import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { ThemeDirective } from './directives/theme';

interface Article {
  title: string;
  category: string;
  time: string;
  excerpt: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgClass, ThemeDirective],
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    :host {
      font-family: 'Inter', sans-serif;
      display: block;
      min-height: 100vh;
    }

    /* ─────────────────────────────────────────
       THEME CLASSES — directive adds these
    ───────────────────────────────────────── */
    .theme-light {
      --bg:         #f5f6fa;
      --surface:    #ffffff;
      --border:     #e5e7eb;
      --text-main:  #111827;
      --text-muted: #6b7280;
      --text-soft:  #9ca3af;
      --badge-bg:   #f3f4f6;
      --badge-text: #374151;
    }

    .theme-dark {
      --bg:         #0f1117;
      --surface:    #1a1d27;
      --border:     #2a2d3e;
      --text-main:  #f1f5f9;
      --text-muted: #94a3b8;
      --text-soft:  #4b5563;
      --badge-bg:   #252836;
      --badge-text: #94a3b8;
    }

    /* ─────────────────────────────────────────
       LAYOUT — uses CSS variables from theme
    ───────────────────────────────────────── */
    .wrapper {
      min-height: 100vh;
      background: var(--bg);
      transition: background .3s ease, color .3s ease;
    }

    .page {
      max-width: 680px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    /* ── Top bar ── */
    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 36px;
    }
    .topbar h1 {
      font-size: 20px;
      font-weight: 700;
      color: var(--text-main);
      transition: color .3s ease;
    }
    .topbar p {
      font-size: 13px;
      color: var(--text-muted);
      margin-top: 3px;
      transition: color .3s ease;
    }

    /* ── Toggle button ── */
    .theme-toggle {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: 999px;
      padding: 8px 16px;
      cursor: pointer;
      transition: background .3s ease, border-color .3s ease;
    }
    .theme-toggle:hover { border-color: var(--text-muted); }
    .toggle-icon { font-size: 16px; }
    .toggle-label {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-main);
      transition: color .3s ease;
    }

    /* ── Switch ── */
    .switch {
      position: relative;
      width: 44px; height: 24px;
      pointer-events: none;
    }
    .switch input { display: none; }
    .slider {
      position: absolute;
      inset: 0;
      background: #e5e7eb;
      border-radius: 999px;
      transition: background .25s ease;
    }
    .slider::before {
      content: '';
      position: absolute;
      width: 17px; height: 17px;
      left: 3px; top: 3.5px;
      background: #fff;
      border-radius: 50%;
      transition: transform .25s ease;
      box-shadow: 0 1px 3px rgba(0,0,0,.2);
    }
    input:checked + .slider { background: #6c63ff; }
    input:checked + .slider::before { transform: translateX(20px); }

    /* ── Status pill ── */
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .05em;
      text-transform: uppercase;
      border: 1px solid var(--border);
      background: var(--badge-bg);
      color: var(--badge-text);
      transition: all .3s ease;
    }
    .status-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: currentColor;
    }

    /* ── Section label ── */
    .section-label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .07em;
      text-transform: uppercase;
      color: var(--text-soft);
      margin-bottom: 14px;
      transition: color .3s ease;
    }

    /* ── Article cards ── */
    .cards {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 28px;
    }

    .card {
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: 14px;
      padding: 20px;
      transition: background .3s ease, border-color .3s ease,
                  transform .15s ease, box-shadow .15s ease;
    }
    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,.08);
    }

    .card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .card-category {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .06em;
      text-transform: uppercase;
      padding: 3px 10px;
      border-radius: 6px;
      background: var(--badge-bg);
      color: var(--badge-text);
      transition: background .3s ease, color .3s ease;
    }
    .card-time {
      font-size: 12px;
      color: var(--text-soft);
      transition: color .3s ease;
    }
    .card-title {
      font-size: 15px;
      font-weight: 600;
      color: var(--text-main);
      margin-bottom: 6px;
      line-height: 1.4;
      transition: color .3s ease;
    }
    .card-excerpt {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.6;
      transition: color .3s ease;
    }

    /* ── How it works box ── */
    .how-box {
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: 14px;
      padding: 20px;
      transition: background .3s ease, border-color .3s ease;
    }
    .how-box h3 {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-main);
      margin-bottom: 14px;
      transition: color .3s ease;
    }
    .how-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 10px;
    }
    .how-row:last-child { margin-bottom: 0; }
    .how-badge {
      padding: 3px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      min-width: 80px;
      text-align: center;
    }
    .how-badge.dark  { background: #1a1d27; color: #f1f5f9; border: 1px solid #2a2d3e; }
    .how-badge.light { background: #f5f6fa; color: #111827; border: 1px solid #e5e7eb; }
    .how-text {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.5;
      transition: color .3s ease;
    }
  `],
  template: `
    <!--
      appTheme directive is applied here on the root wrapper.
      It receives isDark (true/false) and swaps
      'theme-dark' or 'theme-light' class on this element.
      All child elements use CSS variables — so everything
      updates automatically when the class changes.
    -->
    <div class="wrapper" [appTheme]="isDark">
      <div class="page">

        <!-- Top bar -->
        <div class="topbar">
          <div>
            <h1>Theme Directive</h1>
            <p>Toggle between light and dark mode</p>
          </div>

          <div style="display:flex;align-items:center;gap:10px;">

            <!-- Active mode pill -->
            <div class="status-pill">
              <span class="status-dot"></span>
              {{ isDark ? 'Dark Mode' : 'Light Mode' }}
            </div>

            <!-- Toggle button -->
            <div class="theme-toggle" (click)="toggleTheme()">
              <span class="toggle-icon">{{ isDark ? '🌙' : '☀️' }}</span>
              <label class="switch">
                <input type="checkbox" [checked]="isDark" readonly>
                <span class="slider"></span>
              </label>
            </div>

          </div>
        </div>

        <!-- Section label -->
        <div class="section-label">Latest Articles</div>

        <!-- Cards — all themed via CSS variables -->
        <div class="cards">
          <div class="card" *ngFor="let article of articles">
            <div class="card-top">
              <span class="card-category">{{ article.category }}</span>
              <span class="card-time">{{ article.time }}</span>
            </div>
            <div class="card-title">{{ article.title }}</div>
            <div class="card-excerpt">{{ article.excerpt }}</div>
          </div>
        </div>

        <!-- How it works -->
        <div class="how-box">
          <h3>How the directive works</h3>
          <div class="how-row">
            <span class="how-badge dark">isDark = true</span>
            <p class="how-text">Adds <code style="font-size:11px">.theme-dark</code> → dark background, light text</p>
          </div>
          <div class="how-row">
            <span class="how-badge light">isDark = false</span>
            <p class="how-text">Adds <code style="font-size:11px">.theme-light</code> → light background, dark text</p>
          </div>
        </div>

      </div>
    </div>
  `
})
export class AppComponent {

  isDark: boolean = false;

  articles: Article[] = [
    {
      title: 'Getting Started with Angular Directives',
      category: 'Angular',
      time: '5 min read',
      excerpt: 'Learn how custom directives let you extend HTML with your own behaviour and keep your templates clean.'
    },
    {
      title: 'CSS Variables and Dynamic Theming',
      category: 'CSS',
      time: '3 min read',
      excerpt: 'CSS custom properties make it trivial to switch themes at runtime — no JavaScript style manipulation needed.'
    },
    {
      title: 'Renderer2 vs Direct DOM Access',
      category: 'Best Practice',
      time: '4 min read',
      excerpt: 'Always use Renderer2 in Angular to manipulate the DOM safely across all rendering environments.'
    },
  ];

  toggleTheme() {
    this.isDark = !this.isDark;
  }
}