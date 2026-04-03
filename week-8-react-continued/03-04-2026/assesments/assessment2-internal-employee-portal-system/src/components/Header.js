import React from 'react';
import './Header.css';

export default function Header({ onMenuToggle, title }) {
  return (
    <header className="app-header">
      <button className="menu-toggle" onClick={onMenuToggle} aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <h1 className="header-title">{title}</h1>
      <div className="header-right">
        <div className="header-time">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      </div>
    </header>
  );
}
