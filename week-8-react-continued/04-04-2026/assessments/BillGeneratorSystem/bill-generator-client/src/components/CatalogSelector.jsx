import React from 'react';
import { formatCurrency } from '../utils/helpers';
import '../styles/CatalogSelector.css';

const CatalogSelector = ({ catalogs, onSelectItem, selectedCatalog, onCatalogChange }) => {
  const catalogTypes = [
    { type: 'EntranceFee', label: 'Entrance Fee', icon: '🎫' },
    { type: 'Donation', label: 'Donation', icon: '💝' },
    { type: 'SellingPrice', label: 'Products', icon: '🛍️' },
    { type: 'Custom', label: 'Custom Items', icon: '✏️' },
  ];

  // Safety check: ensure catalogs is an array
  const catalogsArray = Array.isArray(catalogs) ? catalogs : [];
  const filteredCatalogs = catalogsArray.filter(c => c.catalogType === selectedCatalog && c.isActive);

  return (
    <div className="catalog-selector">
      <div className="catalog-tabs">
        {catalogTypes.map((cat) => (
          <button
            key={cat.type}
            className={`catalog-tab ${selectedCatalog === cat.type ? 'active' : ''}`}
            onClick={() => onCatalogChange(cat.type)}
          >
            <span className="tab-icon">{cat.icon}</span>
            <span className="tab-label">{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="catalog-items-grid">
        {selectedCatalog === 'Custom' ? (
          <div className="custom-item-message">
            <p>💡 Add custom items directly from the billing form below</p>
          </div>
        ) : filteredCatalogs.length === 0 ? (
          <div className="no-items">
            <p>No items available in this catalog</p>
          </div>
        ) : (
          filteredCatalogs.map((item) => (
            <div
              key={item.id}
              className="catalog-item-card"
              onClick={() => onSelectItem(item)}
            >
              <div className="item-name">{item.name}</div>
              {item.description && (
                <div className="item-description">{item.description}</div>
              )}
              <div className="item-price">{formatCurrency(item.price)}</div>
              <button className="add-btn">+ Add</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CatalogSelector;
