import React from 'react';
import { formatCurrency } from '../utils/helpers';
import '../styles/BillItemsList.css';

const BillItemsList = ({ items, onUpdateQuantity, onRemoveItem }) => {
  if (!items || items.length === 0) {
    return (
      <div className="no-items-message">
        <p>🛒 No items added yet. Select items from the catalog above.</p>
      </div>
    );
  }

  return (
    <div className="bill-items-list">
      <table className="items-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Type</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="item-info">
                  <div className="item-name">{item.itemName}</div>
                  {item.description && (
                    <div className="item-desc">{item.description}</div>
                  )}
                </div>
              </td>
              <td>
                <span className={`item-type-badge ${item.itemType.toLowerCase()}`}>
                  {item.itemType}
                </span>
              </td>
              <td className="price-cell">{formatCurrency(item.unitPrice)}</td>
              <td>
                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="total-cell">{formatCurrency(item.totalPrice)}</td>
              <td>
                <button
                  className="remove-btn"
                  onClick={() => onRemoveItem(item.id)}
                  title="Remove item"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillItemsList;
