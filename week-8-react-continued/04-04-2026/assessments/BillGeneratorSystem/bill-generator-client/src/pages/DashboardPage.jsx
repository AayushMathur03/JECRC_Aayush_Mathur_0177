import React, { useState, useEffect } from 'react';
import { billAPI } from '../services/api';
import { formatCurrency } from '../utils/helpers';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSummary();
  }, [selectedDate]);

  const loadSummary = async () => {
    try {
      setLoading(true);
      const data = await billAPI.getDailySummary(selectedDate);
      setSummary(data);
    } catch (error) {
      alert('Failed to load summary: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading summary...</div>;
  }

  return (
    <div className="dashboard-page">
      <header className="page-header">
        <h1>📈 Daily Sales Summary</h1>
        <div className="date-selector">
          <label>Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
      </header>

      {summary && (
        <div className="dashboard-content">
          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card primary">
              <div className="card-icon">💰</div>
              <div className="card-content">
                <h3>Total Sales</h3>
                <p className="card-value">{formatCurrency(summary.totalSales)}</p>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-icon">🧾</div>
              <div className="card-content">
                <h3>Total Bills</h3>
                <p className="card-value">{summary.totalBills}</p>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-icon">📦</div>
              <div className="card-content">
                <h3>Total Items</h3>
                <p className="card-value">{summary.totalItems}</p>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-icon">💸</div>
              <div className="card-content">
                <h3>Total Discount</h3>
                <p className="card-value">{formatCurrency(summary.totalDiscount)}</p>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-icon">🏛️</div>
              <div className="card-content">
                <h3>Total Tax</h3>
                <p className="card-value">{formatCurrency(summary.totalTax)}</p>
              </div>
            </div>

            <div className="summary-card success">
              <div className="card-icon">✅</div>
              <div className="card-content">
                <h3>Net Sales</h3>
                <p className="card-value">{formatCurrency(summary.netSales)}</p>
              </div>
            </div>
          </div>

          {/* Item Type Breakdown */}
          {summary.itemTypeBreakdown && summary.itemTypeBreakdown.length > 0 && (
            <div className="breakdown-section">
              <h2>Sales Breakdown by Category</h2>
              <div className="breakdown-table-container">
                <table className="breakdown-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Quantity Sold</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.itemTypeBreakdown.map((item) => (
                      <tr key={item.itemType}>
                        <td>
                          <span className={`category-badge ${item.itemType.toLowerCase()}`}>
                            {item.itemType}
                          </span>
                        </td>
                        <td>{item.totalQuantity}</td>
                        <td className="amount">{formatCurrency(item.totalAmount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {summary.totalBills === 0 && (
            <div className="no-data">
              <p>No sales recorded for {selectedDate}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
