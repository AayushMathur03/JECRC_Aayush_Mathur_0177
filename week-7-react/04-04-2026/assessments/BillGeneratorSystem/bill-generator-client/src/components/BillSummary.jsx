import React from 'react';
import { formatCurrency } from '../utils/helpers';
import '../styles/BillSummary.css';

const BillSummary = ({ bill, onDiscountChange, onFinalize, onSaveDraft, onExportPDF }) => {
  const [discountType, setDiscountType] = React.useState('percentage');
  const [discountValue, setDiscountValue] = React.useState(0);

  const handleApplyDiscount = () => {
    const discountData = {
      discountPercentage: discountType === 'percentage' ? parseFloat(discountValue) || 0 : 0,
      discountAmount: discountType === 'fixed' ? parseFloat(discountValue) || 0 : 0,
    };
    onDiscountChange(discountData);
  };

  return (
    <div className="bill-summary">
      <h3>Bill Summary</h3>

      {/* Items List Section */}
      {bill.billItems && bill.billItems.length > 0 && (
        <div className="summary-items-section">
          <h4>Items Added ({bill.billItems.length})</h4>
          <div className="summary-items-list">
            {bill.billItems.map((item, index) => (
              <div key={item.id || index} className="summary-item-row">
                <div className="summary-item-info">
                  <span className="summary-item-name">{item.itemName}</span>
                  <span className="summary-item-qty">x{item.quantity}</span>
                </div>
                <span className="summary-item-price">{formatCurrency(item.totalPrice)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Discount Section */}
      <div className="discount-section">
        <h4>Apply Discount</h4>
        <div className="discount-controls">
          <select
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
            className="discount-type-select"
          >
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount (Rs.)</option>
          </select>

          <input
            type="number"
            min="0"
            step="0.01"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            placeholder="Enter discount"
            className="discount-input"
          />

          <button onClick={handleApplyDiscount} className="apply-discount-btn">
            Apply
          </button>
        </div>
      </div>

      {/* Summary Details */}
      <div className="summary-details">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span className="amount">{formatCurrency(bill.subTotal)}</span>
        </div>

        {bill.discountAmount > 0 && (
          <div className="summary-row discount-row">
            <span>
              Discount {bill.discountPercentage > 0 && `(${bill.discountPercentage}%)`}:
            </span>
            <span className="amount">-{formatCurrency(bill.discountAmount)}</span>
          </div>
        )}

        <div className="summary-row">
          <span>Tax ({bill.taxPercentage}%):</span>
          <span className="amount">{formatCurrency(bill.taxAmount)}</span>
        </div>

        <div className="summary-row total-row">
          <span>TOTAL:</span>
          <span className="amount">{formatCurrency(bill.totalAmount)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="summary-actions">
        {bill.isDraft && (
          <>
            <button onClick={onSaveDraft} className="btn-secondary">
              💾 Save Draft
            </button>
            <button onClick={onFinalize} className="btn-primary">
              ✅ Finalize Bill
            </button>
          </>
        )}
        <button onClick={onExportPDF} className="btn-export">
          📄 Export PDF
        </button>
      </div>

      {/* Bill Info */}
      <div className="bill-info">
        <p><strong>Invoice:</strong> {bill.invoiceNumber}</p>
        <p><strong>Status:</strong> <span className={bill.isDraft ? 'draft' : 'finalized'}>
          {bill.isDraft ? 'DRAFT' : 'FINALIZED'}
        </span></p>
        <p><strong>Date:</strong> {new Date(bill.billDate).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default BillSummary;
