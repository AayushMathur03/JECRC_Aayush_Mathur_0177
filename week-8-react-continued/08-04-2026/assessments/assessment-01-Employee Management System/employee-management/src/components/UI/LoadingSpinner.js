/**
 * LoadingSpinner Component
 * 
 * A global loading overlay that appears when globalLoading is true.
 * This is controlled via Redux UI state.
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { selectGlobalLoading } from '../../redux/slices/uiSlice';
import './UI.css';

const LoadingSpinner = () => {
  const isLoading = useSelector(selectGlobalLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading-overlay">
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
