const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for fetch requests
const fetchAPI = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ========================================
// CATALOG API
// ========================================

export const catalogAPI = {
  getAll: async () => {
    const response = await fetchAPI('/Catalog');
    return response.data || response; // Handle both formats
  },

  getById: async (id) => {
    return await fetchAPI(`/Catalog/${id}`);
  },

  getByType: async (catalogType) => {
    const response = await fetchAPI(`/Catalog/type/${catalogType}`);
    return response.data || response;
  },

  create: async (catalogItem) => {
    return await fetchAPI('/Catalog', {
      method: 'POST',
      body: JSON.stringify(catalogItem),
    });
  },

  update: async (id, catalogItem) => {
    return await fetchAPI(`/Catalog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(catalogItem),
    });
  },

  delete: async (id) => {
    return await fetchAPI(`/Catalog/${id}`, {
      method: 'DELETE',
    });
  },
};

// ========================================
// BILL API
// ========================================

export const billAPI = {
  // Bill Operations
  create: async (billData) => {
    return await fetchAPI('/Bill', {
      method: 'POST',
      body: JSON.stringify(billData),
    });
  },

  getById: async (id) => {
    return await fetchAPI(`/Bill/${id}`);
  },

  getByInvoiceNumber: async (invoiceNumber) => {
    return await fetchAPI(`/Bill/invoice/${invoiceNumber}`);
  },

  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.isDraft !== undefined) params.append('isDraft', filters.isDraft);
    if (filters.invoiceNumber) params.append('invoiceNumber', filters.invoiceNumber);
    if (filters.minAmount) params.append('minAmount', filters.minAmount);
    if (filters.maxAmount) params.append('maxAmount', filters.maxAmount);
    if (filters.pageNumber) params.append('pageNumber', filters.pageNumber);
    if (filters.pageSize) params.append('pageSize', filters.pageSize);

    const queryString = params.toString();
    return await fetchAPI(`/Bill${queryString ? '?' + queryString : ''}`);
  },

  delete: async (id) => {
    return await fetchAPI(`/Bill/${id}`, {
      method: 'DELETE',
    });
  },

  // Bill Item Operations
  addItem: async (billId, itemData) => {
    return await fetchAPI(`/Bill/${billId}/items`, {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  },

  removeItem: async (billId, billItemId) => {
    return await fetchAPI(`/Bill/${billId}/items/${billItemId}`, {
      method: 'DELETE',
    });
  },

  updateItemQuantity: async (billId, billItemId, quantity) => {
    return await fetchAPI(`/Bill/${billId}/items/${billItemId}/quantity`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    });
  },

  // Discount Operations
  applyDiscount: async (billId, discountData) => {
    return await fetchAPI(`/Bill/${billId}/discount`, {
      method: 'PATCH',
      body: JSON.stringify(discountData),
    });
  },

  // Finalization
  finalize: async (billId) => {
    return await fetchAPI(`/Bill/${billId}/finalize`, {
      method: 'PATCH',
    });
  },

  updateNotes: async (billId, notes) => {
    return await fetchAPI(`/Bill/${billId}/notes`, {
      method: 'PATCH',
      body: JSON.stringify({ notes }),
    });
  },

  // Summary
  getDailySummary: async (date) => {
    const params = date ? `?date=${date}` : '';
    return await fetchAPI(`/Bill/summary/daily${params}`);
  },
};
