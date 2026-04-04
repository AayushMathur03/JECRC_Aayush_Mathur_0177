import React, { useState, useEffect } from 'react';
import { billAPI } from '../services/api';
import { formatCurrency, formatDate, exportToCSV, exportToPDF } from '../utils/helpers';
import '../styles/HistoryPage.css';

const HistoryPage = () => {
  const [bills, setBills] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    isDraft: '',
    invoiceNumber: '',
    pageNumber: 1,
    pageSize: 10,
  });
  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    loadBills();
  }, [filters.pageNumber]);

  const loadBills = async () => {
    try {
      setLoading(true);
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '')
      );
      
      const response = await billAPI.getAll(cleanFilters);
      setBills(response.data);
      setTotalCount(response.totalCount);
    } catch (error) {
      alert('Failed to load bills: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setFilters({ ...filters, pageNumber: 1 });
    loadBills();
  };

  const handleClearFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      isDraft: '',
      invoiceNumber: '',
      pageNumber: 1,
      pageSize: 10,
    });
    setTimeout(() => loadBills(), 100);
  };

  const handleViewDetails = async (billId) => {
    try {
      const bill = await billAPI.getById(billId);
      setSelectedBill(bill);
    } catch (error) {
      alert('Failed to load bill details: ' + error.message);
    }
  };

  const handleDeleteBill = async (billId) => {
    if (!confirm('Are you sure you want to delete this bill?')) return;

    try {
      await billAPI.delete(billId);
      alert('Bill deleted successfully');
      loadBills();
    } catch (error) {
      alert('Failed to delete bill: ' + error.message);
    }
  };

  const handleExportCSV = () => {
    exportToCSV(bills);
  };

  const totalPages = Math.ceil(totalCount / filters.pageSize);

  return (
    <div className="history-page">
      <header className="page-header">
        <h1>📊 Bill History</h1>
        <button onClick={handleExportCSV} className="btn-export" disabled={bills.length === 0}>
          📥 Export to CSV
        </button>
      </header>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Invoice Number:</label>
          <input
            type="text"
            value={filters.invoiceNumber}
            onChange={(e) => setFilters({ ...filters, invoiceNumber: e.target.value })}
            placeholder="Search by invoice number"
          />
        </div>

        <div className="filter-group">
          <label>Start Date:</label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label>End Date:</label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select
            value={filters.isDraft}
            onChange={(e) => setFilters({ ...filters, isDraft: e.target.value })}
          >
            <option value="">All</option>
            <option value="true">Draft</option>
            <option value="false">Finalized</option>
          </select>
        </div>

        <div className="filter-actions">
          <button onClick={handleSearch} className="btn-search">
            🔍 Search
          </button>
          <button onClick={handleClearFilters} className="btn-clear">
            Clear
          </button>
        </div>
      </div>

      {/* Bills Table */}
      {loading ? (
        <div className="loading">Loading bills...</div>
      ) : bills.length === 0 ? (
        <div className="no-data">No bills found</div>
      ) : (
        <>
          <div className="bills-table-container">
            <table className="bills-table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr key={bill.id}>
                    <td className="invoice-number">{bill.invoiceNumber}</td>
                    <td>{formatDate(bill.billDate)}</td>
                    <td>{bill.billItems?.length || 0} items</td>
                    <td className="amount">{formatCurrency(bill.totalAmount)}</td>
                    <td>
                      <span className={`status-badge ${bill.isDraft ? 'draft' : 'finalized'}`}>
                        {bill.isDraft ? 'Draft' : 'Finalized'}
                      </span>
                    </td>
                    <td className="actions">
                      <button
                        onClick={() => handleViewDetails(bill.id)}
                        className="btn-view"
                        title="View Details"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => exportToPDF(bill)}
                        className="btn-pdf"
                        title="Export PDF"
                      >
                        📄
                      </button>
                      {bill.isDraft && (
                        <button
                          onClick={() => handleDeleteBill(bill.id)}
                          className="btn-delete"
                          title="Delete Bill"
                        >
                          🗑️
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => setFilters({ ...filters, pageNumber: filters.pageNumber - 1 })}
              disabled={filters.pageNumber === 1}
              className="pagination-btn"
            >
              ← Previous
            </button>
            
            <span className="pagination-info">
              Page {filters.pageNumber} of {totalPages} ({totalCount} total bills)
            </span>
            
            <button
              onClick={() => setFilters({ ...filters, pageNumber: filters.pageNumber + 1 })}
              disabled={filters.pageNumber >= totalPages}
              className="pagination-btn"
            >
              Next →
            </button>
          </div>
        </>
      )}

      {/* Bill Details Modal */}
      {selectedBill && (
        <div className="modal-overlay" onClick={() => setSelectedBill(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Bill Details</h2>
              <button onClick={() => setSelectedBill(null)} className="modal-close">
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="bill-details">
                <p><strong>Invoice Number:</strong> {selectedBill.invoiceNumber}</p>
                <p><strong>Date:</strong> {formatDate(selectedBill.billDate)}</p>
                <p><strong>Status:</strong> <span className={selectedBill.isDraft ? 'draft' : 'finalized'}>
                  {selectedBill.isDraft ? 'DRAFT' : 'FINALIZED'}
                </span></p>
                {selectedBill.notes && <p><strong>Notes:</strong> {selectedBill.notes}</p>}
              </div>

              <h3>Items</h3>
              <table className="modal-items-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBill.billItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.itemName}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency(item.unitPrice)}</td>
                      <td>{formatCurrency(item.totalPrice)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="bill-summary-modal">
                <p>Subtotal: {formatCurrency(selectedBill.subTotal)}</p>
                {selectedBill.discountAmount > 0 && (
                  <p>Discount: -{formatCurrency(selectedBill.discountAmount)}</p>
                )}
                <p>Tax ({selectedBill.taxPercentage}%): {formatCurrency(selectedBill.taxAmount)}</p>
                <p className="total">TOTAL: {formatCurrency(selectedBill.totalAmount)}</p>
              </div>

              <div className="modal-actions">
                <button onClick={() => exportToPDF(selectedBill)} className="btn-primary">
                  📄 Export PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
