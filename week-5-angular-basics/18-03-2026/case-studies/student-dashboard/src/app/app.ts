import { Component } from '@angular/core';
import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgClass, NgStyle } from '@angular/common';

interface Student {
  name: string;
  marks: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgClass, NgStyle],
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
      max-width: 780px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    /* ── Header ── */
    .header { margin-bottom: 32px; }
    .header h1 {
      font-size: 26px;
      font-weight: 700;
      color: #111827;
    }
    .header p {
      font-size: 14px;
      color: #6b7280;
      margin-top: 6px;
    }

    /* ── Directive legend ── */
    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 28px;
    }
    .legend-tag {
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .04em;
      font-family: monospace;
    }
    .tag-for     { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
    .tag-if      { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
    .tag-switch  { background: #fdf4ff; color: #7e22ce; border: 1px solid #e9d5ff; }
    .tag-class   { background: #fff7ed; color: #c2410c; border: 1px solid #fed7aa; }
    .tag-style   { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

    /* ── Summary cards ── */
    .summary {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 28px;
    }
    .sum-card {
      background: #fff;
      border: 1.5px solid #e5e7eb;
      border-radius: 12px;
      padding: 16px 18px;
      text-align: center;
    }
    .sum-num {
      font-size: 26px;
      font-weight: 700;
      line-height: 1;
    }
    .sum-num.total   { color: #111827; }
    .sum-num.pass    { color: #16a34a; }
    .sum-num.fail    { color: #dc2626; }
    .sum-num.topper  { color: #d97706; }
    .sum-label {
      font-size: 12px;
      color: #9ca3af;
      margin-top: 5px;
    }

    /* ── Table card ── */
    .table-card {
      background: #fff;
      border: 1.5px solid #e5e7eb;
      border-radius: 14px;
      overflow: hidden;
    }

    table { width: 100%; border-collapse: collapse; }

    thead tr {
      background: #f9fafb;
      border-bottom: 1.5px solid #e5e7eb;
    }
    th {
      padding: 12px 18px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .06em;
      text-transform: uppercase;
      color: #9ca3af;
      text-align: left;
    }
    th .dir-tag {
      display: inline-block;
      margin-left: 6px;
      padding: 1px 6px;
      border-radius: 4px;
      font-size: 9px;
      font-weight: 700;
      font-family: monospace;
      letter-spacing: .02em;
      vertical-align: middle;
    }

    tbody tr {
      border-bottom: 1px solid #f3f4f6;
      transition: background .15s ease;
    }
    tbody tr:last-child { border-bottom: none; }
    tbody tr:hover { background: #fafafa; }

    /* ngClass — topper row highlight */
    tbody tr.topper-row {
      background: #fffbeb;
      border-left: 3px solid #f59e0b;
    }
    tbody tr.topper-row:hover { background: #fef3c7; }

    td {
      padding: 14px 18px;
      font-size: 14px;
      color: #374151;
      vertical-align: middle;
    }

    /* ── Avatar ── */
    .student-cell { display: flex; align-items: center; gap: 10px; }
    .avatar {
      width: 34px; height: 34px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700;
      flex-shrink: 0;
    }
    .avatar-topper { background: #fef3c7; color: #b45309; }
    .avatar-normal { background: #f3f4f6; color: #6b7280; }
    .student-name  { font-weight: 600; color: #111827; }
    .topper-crown  { font-size: 11px; margin-left: 4px; }

    /* ── Marks bar ── */
    .marks-wrap { min-width: 130px; }
    .marks-top {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #9ca3af;
      margin-bottom: 5px;
    }
    .marks-top strong { font-size: 13px; color: #111827; }
    .bar-bg {
      height: 6px;
      background: #f3f4f6;
      border-radius: 999px;
      overflow: hidden;
    }
    .bar-fill {
      height: 100%;
      border-radius: 999px;
      transition: width .4s ease;
    }

    /* ── Grade badge (ngSwitch) ── */
    .grade-badge {
      display: inline-block;
      width: 34px; height: 34px;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 700;
      text-align: center;
      line-height: 34px;
    }
    .grade-a  { background: #f0fdf4; color: #15803d; border: 1.5px solid #bbf7d0; }
    .grade-b  { background: #eff6ff; color: #1d4ed8; border: 1.5px solid #bfdbfe; }
    .grade-c  { background: #fff7ed; color: #c2410c; border: 1.5px solid #fed7aa; }
    .grade-d  { background: #fdf4ff; color: #7e22ce; border: 1.5px solid #e9d5ff; }
    .grade-f  { background: #fef2f2; color: #b91c1c; border: 1.5px solid #fecaca; }

    /* ── Pass/Fail badge (ngIf + ngStyle) ── */
    .result-badge {
      display: inline-block;
      padding: 5px 14px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
    }
  `],
  template: `
    <div class="page">

      <!-- Header -->
      <div class="header">
        <h1>Student Dashboard</h1>
        <p>All 5 Angular built-in directives demonstrated in one view</p>
      </div>

      <!-- Directive legend -->
      <div class="legend">
        <span class="legend-tag tag-for">*ngFor — loops students</span>
        <span class="legend-tag tag-if">*ngIf — shows pass / fail</span>
        <span class="legend-tag tag-switch">ngSwitch — grade system</span>
        <span class="legend-tag tag-class">ngClass — highlights toppers</span>
        <span class="legend-tag tag-style">ngStyle — colors result badge</span>
      </div>

      <!-- Summary -->
      <div class="summary">
        <div class="sum-card">
          <div class="sum-num total">{{ students.length }}</div>
          <div class="sum-label">Total</div>
        </div>
        <div class="sum-card">
          <div class="sum-num pass">{{ passCount }}</div>
          <div class="sum-label">Passed</div>
        </div>
        <div class="sum-card">
          <div class="sum-num fail">{{ failCount }}</div>
          <div class="sum-label">Failed</div>
        </div>
        <div class="sum-card">
          <div class="sum-num topper">{{ topperCount }}</div>
          <div class="sum-label">Toppers (≥80)</div>
        </div>
      </div>

      <!-- Table -->
      <div class="table-card">
        <table>
          <thead>
            <tr>
              <th>
                Student
                <span class="dir-tag tag-for">*ngFor</span>
              </th>
              <th>Marks</th>
              <th>
                Grade
                <span class="dir-tag tag-switch">ngSwitch</span>
              </th>
              <th>
                Result
                <span class="dir-tag tag-if">*ngIf</span>
                <span class="dir-tag tag-style">ngStyle</span>
              </th>
            </tr>
          </thead>
          <tbody>

            <!--
              ① *ngFor — loops over the students array
                 Every <tr> is repeated for each student
            -->
            <tr
              *ngFor="let student of students"

              <!--
                ④ ngClass — adds 'topper-row' class if marks >= 80
                   Toppers get a yellow left border + warm background
              -->
              [ngClass]="{ 'topper-row': student.marks >= 80 }"
            >

              <!-- Name + avatar -->
              <td>
                <div class="student-cell">
                  <div
                    class="avatar"
                    [ngClass]="student.marks >= 80 ? 'avatar-topper' : 'avatar-normal'"
                  >
                    {{ student.name[0] }}
                  </div>
                  <span class="student-name">
                    {{ student.name }}
                    <!-- Show crown only for toppers -->
                    <span *ngIf="student.marks >= 80" class="topper-crown">👑</span>
                  </span>
                </div>
              </td>

              <!-- Marks + progress bar -->
              <td>
                <div class="marks-wrap">
                  <div class="marks-top">
                    <strong>{{ student.marks }}</strong>
                    <span>/ 100</span>
                  </div>
                  <div class="bar-bg">
                    <div
                      class="bar-fill"
                      [style.width.%]="student.marks"
                      [style.background]="student.marks >= 50 ? '#22c55e' : '#ef4444'"
                    ></div>
                  </div>
                </div>
              </td>

              <!--
                ③ ngSwitch — shows grade letter based on marks range
                   A: 80-100 | B: 65-79 | C: 50-64 | D: 35-49 | F: 0-34
              -->
              <td>
                <ng-container [ngSwitch]="getGrade(student.marks)">
                  <span *ngSwitchCase="'A'" class="grade-badge grade-a">A</span>
                  <span *ngSwitchCase="'B'" class="grade-badge grade-b">B</span>
                  <span *ngSwitchCase="'C'" class="grade-badge grade-c">C</span>
                  <span *ngSwitchCase="'D'" class="grade-badge grade-d">D</span>
                  <span *ngSwitchDefault     class="grade-badge grade-f">F</span>
                </ng-container>
              </td>

              <!-- Result badge -->
              <td>
                <!--
                  ② *ngIf — shows "Pass" badge ONLY if marks >= 50
                     Otherwise shows "Fail" badge
                -->

                <!-- PASS badge -->
                <span
                  *ngIf="student.marks >= 50"
                  class="result-badge"

                  <!--
                    ⑤ ngStyle — sets background & color dynamically
                       Pass → green tones
                  -->
                  [ngStyle]="{
                    'background': '#f0fdf4',
                    'color': '#16a34a',
                    'border': '1px solid #bbf7d0'
                  }"
                >
                  ✓ Pass
                </span>

                <!-- FAIL badge -->
                <span
                  *ngIf="student.marks < 50"
                  class="result-badge"

                  <!--
                    ⑤ ngStyle — sets background & color dynamically
                       Fail → red tones
                  -->
                  [ngStyle]="{
                    'background': '#fef2f2',
                    'color': '#dc2626',
                    'border': '1px solid #fecaca'
                  }"
                >
                  ✗ Fail
                </span>

              </td>

            </tr>
          </tbody>
        </table>
      </div>

    </div>
  `
})
export class AppComponent {

  students: Student[] = [
    { name: 'Aarav Shah',    marks: 92 },
    { name: 'Priya Mehta',   marks: 45 },
    { name: 'Rohan Verma',   marks: 78 },
    { name: 'Sneha Patil',   marks: 31 },
    { name: 'Karan Singh',   marks: 85 },
    { name: 'Anjali Nair',   marks: 56 },
    { name: 'Dev Sharma',    marks: 40 },
    { name: 'Meera Joshi',   marks: 88 },
    { name: 'Arjun Rao',     marks: 62 },
    { name: 'Pooja Iyer',    marks: 23 },
  ];

  // Used by ngSwitch in the template
  getGrade(marks: number): string {
    if (marks >= 80) return 'A';
    if (marks >= 65) return 'B';
    if (marks >= 50) return 'C';
    if (marks >= 35) return 'D';
    return 'F';
  }

  get passCount()   { return this.students.filter(s => s.marks >= 50).length; }
  get failCount()   { return this.students.filter(s => s.marks <  50).length; }
  get topperCount() { return this.students.filter(s => s.marks >= 80).length; }
}
