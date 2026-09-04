import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound({ isExpiredOrMissing = false, pasteId = '' }) {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-badge">
        {isExpiredOrMissing ? '404 • Not Found or Expired' : '404 • Page Not Found'}
      </div>

      <h1 className="not-found-title">
        {isExpiredOrMissing ? 'Paste not found' : 'Page not found'}
      </h1>

      <p className="not-found-subtitle">
        {isExpiredOrMissing
          ? pasteId 
            ? `The paste with ID "${pasteId}" does not exist, has expired, or was removed.` 
            : 'This paste does not exist, has expired, or was removed.'
          : 'The page you are looking for does not exist.'}
      </p>

      <button
        type="button"
        className="btn-primary"
        onClick={() => navigate('/')}
        style={{ marginTop: '0.5rem' }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Create a new paste
      </button>
    </div>
  );
}
