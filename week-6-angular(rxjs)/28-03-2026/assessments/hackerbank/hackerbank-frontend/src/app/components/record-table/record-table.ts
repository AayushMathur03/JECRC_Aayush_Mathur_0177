import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-record-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './record-table.html',
  styleUrls: ['./record-table.css']
})
export class RecordTableComponent implements OnInit {
  transactions: Transaction[] = [];
  selectedDate: string = '';

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
  this.loadTransactions();  // ← call with NO argument on init
}

loadTransactions(date?: string): void {
  // Only pass date if it's actually a non-empty string
  const dateParam = date && date.trim() !== '' ? date : undefined;
  
  this.transactionService.getTransactions(dateParam).subscribe({
    next: (data) => this.transactions = data,
    error: (err) => console.error('Error loading transactions', err)
  });
}

onFilter(): void {
  if (!this.selectedDate || this.selectedDate.trim() === '') {
    return;  // Do nothing if no date chosen
  }
  this.loadTransactions(this.selectedDate);
}

  sortByAmount(): void {
    this.transactions = [...this.transactions].sort((a, b) => a.amount - b.amount);
  }

  getTypeName(type: number): string {
    return type === 0 ? 'Credit' : 'Debit';
  }
}