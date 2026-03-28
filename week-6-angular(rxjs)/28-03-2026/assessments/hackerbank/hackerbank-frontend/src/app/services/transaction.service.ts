import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { environment } from '../../environments/environment';
// import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private apiUrl = `${environment.apiBaseUrl}/api/transactions`;

  constructor(private http: HttpClient) {}

  getTransactions(date?: string): Observable<Transaction[]> {
  let params = new HttpParams();
  if (date && date.trim() !== '') {
    params = params.set('date', date);
  }
  return this.http.get<Transaction[]>(this.apiUrl, { params });
}
}