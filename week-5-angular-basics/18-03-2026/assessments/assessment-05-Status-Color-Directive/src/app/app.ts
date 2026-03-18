import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { StatusColorDirective } from './directives/status-color';

interface Student {
  name: string;
  subject: string;
  marks: number;
  total: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgClass, StatusColorDirective],
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
      max-width: 700px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    /* ── Header ── */
    .header { margin-bottom: 28px; }
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

    /* ── Info bar ── */
    .info-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      border: 1.5px solid #e5e7eb;
      border-radius: 12px;
      padding: 14px 20px;
      margin-bottom: 20px;
    }
    .info-bar p { font-size: 13px; color: #6b7280; }
    .info-bar strong { color: #111827; }
    .legend {
      display: flex;
      gap: 16px;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: #6b7280;
    }
    .legend-dot {
      width: 9px; height: 9px;
      border-radius: 50%;
    }
    .legend-dot.green { background: #22c55e; }
    .legend-dot.red   { background: #ef4444; }

    /* ── Table card ── */
    .table-card {
      background: #fff;
      border: 1.5px solid #e5e7eb;
      border-radius: 14px;
      overflow: hidden;
      margin-bottom: 24px;
    }

    /* ── Table ── */
    table {
      width: 100%;
      border-collapse: collapse;
    }
    thead tr {
      background: #f9fafb;
      border-bottom: 1.5px solid #e5e7eb;
    }
    th {
      padding: 12px 20px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .06em;
      text-transform: uppercase;
      color: #9ca3af;
      text-align: left;
    }
    tbody tr {
      border-bottom: 1px solid #f3f4f6;
      transition: background .15s ease;
    }
    tbody tr:last-child { border-bottom: none; }
    tbody tr:hover { background: #fafafa; }
    td {
      padding: 14px 20px;
      font-size: 14px;
      color: #374151;
      vertical-align: middle;
    }

    /* ── Avatar ── */
    .avatar {
      width: 34px; height: 34px;
      border-radius: 50%;
      background: #e5e7eb;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
      color: #6b7280;
      margin-right: 10px;
      flex-shrink: 0;
    }
    .student-cell {
      display: flex;
      align-items: center;
    }
    .student-name { font-weight: 600; color: #111827; }

    /* ── Progress bar ── */
    .marks-cell { min-width: 140px; }
    .marks-top {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 5px;
    }
    .marks-top strong { color: #111827; font-size: 13px; }
    .progress-bar {
      height: 6px;
      background: #f3f4f6;
      border-radius: 999px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      border-radius: 999px;
      transition: width .4s ease;
    }
    .progress-fill.pass { background: #22c55e; }
    .progress-fill.fail { background: #ef4444; }

    /* ── Status badge — directive applies these classes ── */
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 5px 12px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
    }
    /* Directive adds one of these two classes */
    .status-pass {
      background: #f0fdf4;
      color: #16a34a;
      border: 1px solid #bbf7d0;
    }
    .status-fail {
      background: #fef2f2;
      color: #dc2626;
      border: 1px solid #fecaca;
    }

    /* ── Summary cards ── */
    .summary {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    .summary-card {
      background: #fff;
      border: 1.5px solid #e5e7eb;
      border-radius: 12px;
      padding: 18px 20px;
      text-align: center;
    }
    .summary-num {
      font-size: 28px;
      font-weight: 700;
      line-height: 1;
    }
    .summary-num.total  { color: #111827; }
    .summary-num.passed { color: #16a34a; }
    .summary-num.failed { color: #dc2626; }
    .summary-label {
      font-size: 12px;
      color: #9ca3af;
      margin-top: 6px;
    }
  `],
  template: `
    <div class="page">

      <!-- Header -->
      <div class="header">
        <h1>Student Result Status</h1>
        <p>
          The <code style="background:#f3f4f6;padding:2px 6px;border-radius:4px;font-size:12px">appStatusColor</code>
          directive highlights each student's result — green for pass, red for fail.
        </p>
      </div>

      <!-- Info bar -->
      <div class="info-bar">
        <p>Passing criteria: <strong>{{ passingMarks }} / 100</strong></p>
        <div class="legend">
          <div class="legend-item">
            <div class="legend-dot green"></div>
            Pass (≥ {{ passingMarks }})
          </div>
          <div class="legend-item">
            <div class="legend-dot red"></div>
            Fail (&lt; {{ passingMarks }})
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="table-card">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let student of students">

              <!-- Name -->
              <td>
                <div class="student-cell">
                  <div class="avatar">{{ student.name[0] }}</div>
                  <span class="student-name">{{ student.name }}</span>
                </div>
              </td>

              <!-- Subject -->
              <td>{{ student.subject }}</td>

              <!-- Marks with progress bar -->
              <td class="marks-cell">
                <div class="marks-top">
                  <strong>{{ student.marks }}</strong>
                  <span>/ {{ student.total }}</span>
                </div>
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    [ngClass]="student.marks >= passingMarks ? 'pass' : 'fail'"
                    [style.width.%]="(student.marks / student.total) * 100"
                  ></div>
                </div>
              </td>

              <!-- Status badge — directive applied here -->
              <!--
                [appStatusColor]="student.marks"  → passes marks to directive
                [passingMarks]="passingMarks"      → passes threshold (50)
                Directive then adds 'status-pass' or 'status-fail' class
              -->
              <td>
                <span
                  class="status-badge"
                  [appStatusColor]="student.marks"
                  [passingMarks]="passingMarks"
                >
                  {{ student.marks >= passingMarks ? '✓ Pass' : '✗ Fail' }}
                </span>
              </td>

            </tr>
          </tbody>
        </table>
      </div>

      <!-- Summary -->
      <div class="summary">
        <div class="summary-card">
          <div class="summary-num total">{{ students.length }}</div>
          <div class="summary-label">Total Students</div>
        </div>
        <div class="summary-card">
          <div class="summary-num passed">{{ passCount }}</div>
          <div class="summary-label">Passed</div>
        </div>
        <div class="summary-card">
          <div class="summary-num failed">{{ failCount }}</div>
          <div class="summary-label">Failed</div>
        </div>
      </div>

    </div>
  `
})
export class AppComponent {

  passingMarks = 50;

  students: Student[] = [
    { name: 'Aarav Shah',     subject: 'Mathematics',  marks: 82, total: 100 },
    { name: 'Priya Mehta',    subject: 'Science',      marks: 45, total: 100 },
    { name: 'Rohan Verma',    subject: 'English',      marks: 67, total: 100 },
    { name: 'Sneha Patil',    subject: 'History',      marks: 38, total: 100 },
    { name: 'Karan Singh',    subject: 'Mathematics',  marks: 91, total: 100 },
    { name: 'Anjali Nair',    subject: 'Science',      marks: 50, total: 100 },
    { name: 'Dev Sharma',     subject: 'Geography',    marks: 29, total: 100 },
    { name: 'Meera Joshi',    subject: 'English',      marks: 74, total: 100 },
  ];

  get passCount() { return this.students.filter(s => s.marks >= this.passingMarks).length; }
  get failCount()  { return this.students.filter(s => s.marks <  this.passingMarks).length; }
}