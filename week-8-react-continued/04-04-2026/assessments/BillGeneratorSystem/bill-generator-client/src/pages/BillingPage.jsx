import React, { useState, useEffect, useRef } from 'react';
import { catalogAPI, billAPI } from '../services/api';
import CatalogSelector from '../components/CatalogSelector';
import BillItemsList from '../components/BillItemsList';
import BillSummary from '../components/BillSummary';
import { exportToPDF } from '../utils/helpers';
import '../styles/BillingPage.css';

const BillingPage = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [selectedCatalog, setSelectedCatalog] = useState('EntranceFee');
  const [currentBill, setCurrentBill] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customItemForm, setCustomItemForm] = useState({
    name: '',
    description: '',
    price: '',
    quantity: 1,
  });
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [showCustomDonationModal, setShowCustomDonationModal] = useState(false);
  const [customDonationAmount, setCustomDonationAmount] = useState('');
  const billCreated = useRef(false);

  // Load catalogs on mount
  useEffect(() => {
    loadCatalogs();
    // Only create bill once
    if (!billCreated.current && !currentBill) {
      billCreated.current = true;
      createNewBill();
    }
  }, []);

  const loadCatalogs = async () => {
    try {
      const data = await catalogAPI.getAll();
      console.log('Catalogs loaded:', data);
      setCatalogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Catalog loading error:', error);
      alert('Failed to load catalogs: ' + error.message);
      setCatalogs([]); // Set empty array to prevent crashes
    }
  };

  const createNewBill = async () => {
    if (loading) return; // Prevent duplicate calls
    
    try {
      setLoading(true);
      const newBill = await billAPI.create({
        notes: '',
        isDraft: true,
        taxPercentage: 18,
      });
      setCurrentBill(newBill);
      console.log('Bill created successfully:', newBill);
    } catch (error) {
      console.error('Bill creation error:', error);
      // Only alert if not a duplicate call
      if (!currentBill) {
        alert('Failed to create bill: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshBill = async () => {
    if (!currentBill) return;
    try {
      const updatedBill = await billAPI.getById(currentBill.id);
      setCurrentBill(updatedBill);
    } catch (error) {
      alert('Failed to refresh bill: ' + error.message);
    }
  };

  const handleSelectCatalogItem = async (item) => {
    if (!currentBill) {
      alert('Please create a bill first');
      return;
    }

    // Check if this is a custom donation (price is 0 and name contains "Custom")
    if (item.catalogType === 'Donation' && item.price === 0) {
      setShowCustomDonationModal(true);
      return;
    }

    try {
      setLoading(true);
      await billAPI.addItem(currentBill.id, {
        catalogItemId: item.id,
        itemName: item.name,
        description: item.description,
        quantity: 1,
        unitPrice: item.price,
        itemType: item.catalogType,
      });
      await refreshBill();
    } catch (error) {
      alert('Failed to add item: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomDonation = async () => {
    const amount = parseFloat(customDonationAmount);
    if (!amount || amount <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    try {
      setLoading(true);
      await billAPI.addItem(currentBill.id, {
        catalogItemId: null,
        itemName: 'Custom Donation',
        description: `Donation of Rs.${amount.toFixed(2)}`,
        quantity: 1,
        unitPrice: amount,
        itemType: 'Donation',
      });
      setShowCustomDonationModal(false);
      setCustomDonationAmount('');
      await refreshBill();
    } catch (error) {
      alert('Failed to add donation: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomItem = async () => {
    if (!currentBill) {
      alert('Please create a bill first');
      return;
    }

    if (!customItemForm.name || !customItemForm.price) {
      alert('Please fill in item name and price');
      return;
    }

    try {
      setLoading(true);
      await billAPI.addItem(currentBill.id, {
        catalogItemId: null,
        itemName: customItemForm.name,
        description: customItemForm.description,
        quantity: parseInt(customItemForm.quantity) || 1,
        unitPrice: parseFloat(customItemForm.price),
        itemType: 'Custom',
      });
      
      setCustomItemForm({ name: '', description: '', price: '', quantity: 1 });
      setShowCustomForm(false);
      await refreshBill();
    } catch (error) {
      alert('Failed to add custom item: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (billItemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      setLoading(true);
      await billAPI.updateItemQuantity(currentBill.id, billItemId, newQuantity);
      await refreshBill();
    } catch (error) {
      alert('Failed to update quantity: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (billItemId) => {
    if (!confirm('Remove this item from the bill?')) return;

    try {
      setLoading(true);
      await billAPI.removeItem(currentBill.id, billItemId);
      await refreshBill();
    } catch (error) {
      alert('Failed to remove item: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyDiscount = async (discountData) => {
    try {
      setLoading(true);
      await billAPI.applyDiscount(currentBill.id, discountData);
      await refreshBill();
    } catch (error) {
      alert('Failed to apply discount: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalizeBill = async () => {
    if (!currentBill.billItems || currentBill.billItems.length === 0) {
      alert('Cannot finalize an empty bill. Please add items first.');
      return;
    }

    if (!confirm('Finalize this bill? You cannot edit it after finalization.')) return;

    try {
      setLoading(true);
      await billAPI.finalize(currentBill.id);
      await refreshBill();
      alert('Bill finalized successfully!');
      
      // Create new bill for next transaction
      setTimeout(() => createNewBill(), 1000);
    } catch (error) {
      alert('Failed to finalize bill: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    alert('Draft saved! Bill ID: ' + currentBill.invoiceNumber);
  };

  const handleExportPDF = () => {
    if (!currentBill) return;
    exportToPDF(currentBill);
  };

  if (loading && !currentBill) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="billing-page">
      <header className="page-header">
        <h1>🧾 Multi-Catalog Bill Generator</h1>
        <div className="header-actions">
          <button onClick={createNewBill} className="btn-new-bill">
            + New Bill
          </button>
        </div>
      </header>

      <div className="billing-container">
        {/* Left Section: Catalog & Items */}
        <div className="left-section">
          <CatalogSelector
            catalogs={catalogs}
            selectedCatalog={selectedCatalog}
            onCatalogChange={setSelectedCatalog}
            onSelectItem={handleSelectCatalogItem}
          />

          {/* Custom Item Form */}
          {selectedCatalog === 'Custom' && (
            <div className="custom-item-section">
              <button
                onClick={() => setShowCustomForm(!showCustomForm)}
                className="toggle-custom-btn"
              >
                {showCustomForm ? '− Hide Custom Item Form' : '+ Add Custom Item'}
              </button>

              {showCustomForm && (
                <div className="custom-item-form">
                  <input
                    type="text"
                    placeholder="Item Name *"
                    value={customItemForm.name}
                    onChange={(e) =>
                      setCustomItemForm({ ...customItemForm, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={customItemForm.description}
                    onChange={(e) =>
                      setCustomItemForm({ ...customItemForm, description: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Price *"
                    min="0"
                    step="0.01"
                    value={customItemForm.price}
                    onChange={(e) =>
                      setCustomItemForm({ ...customItemForm, price: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    min="1"
                    value={customItemForm.quantity}
                    onChange={(e) =>
                      setCustomItemForm({ ...customItemForm, quantity: e.target.value })
                    }
                  />
                  <button onClick={handleAddCustomItem} className="btn-add-custom">
                    ✅ Add Custom Item
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Bill Items List */}
          {currentBill && (
            <div className="bill-items-section">
              <h3>Current Bill Items</h3>
              <BillItemsList
                items={currentBill.billItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            </div>
          )}
        </div>

        {/* Right Section: Bill Summary */}
        <div className="right-section">
          {currentBill && (
            <BillSummary
              bill={currentBill}
              onDiscountChange={handleApplyDiscount}
              onFinalize={handleFinalizeBill}
              onSaveDraft={handleSaveDraft}
              onExportPDF={handleExportPDF}
            />
          )}
        </div>
      </div>

      {loading && <div className="loading-overlay">Processing...</div>}

      {/* Custom Donation Modal */}
      {showCustomDonationModal && (
        <div className="modal-overlay" onClick={() => setShowCustomDonationModal(false)}>
          <div className="modal-content custom-donation-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>💝 Custom Donation</h2>
              <button onClick={() => setShowCustomDonationModal(false)} className="modal-close">
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p>Enter your donation amount:</p>
              <div className="donation-input-group">
                <span className="currency-prefix">Rs.</span>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={customDonationAmount}
                  onChange={(e) => setCustomDonationAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="donation-amount-input"
                  autoFocus
                />
              </div>
              <div className="modal-actions">
                <button 
                  onClick={() => setShowCustomDonationModal(false)} 
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddCustomDonation} 
                  className="btn-add-donation"
                  disabled={!customDonationAmount || parseFloat(customDonationAmount) <= 0}
                >
                  Add Donation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingPage;
