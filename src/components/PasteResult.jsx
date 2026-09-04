import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PasteResult({ paste, onNewPaste }) {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const pasteUrl = `${window.location.origin}/p/${paste.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pasteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getExpiryLabel = (expiry) => {
    switch (expiry) {
      case '10m': return '10 minutes';
      case '1h': return '1 hour';
      case '1d': return '1 day';
      case '7d': return '7 days';
      default: return 'Never';
    }
  };

  return (
    <div className="result-card-container">
      <div className="result-card">
        <div className="success-icon-wrapper">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div className="result-header">
          <h2 className="result-title">Your paste is ready</h2>
          <p className="result-subtitle">Share the link below with anyone</p>
        </div>

        <div className="metadata-pills">
          <span className="pill">
            <span className="pill-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </span>
            {paste.language}
          </span>

          <span className="pill">
            Expires: {getExpiryLabel(paste.expiry)}
          </span>

          <span className="pill">
            ID: {paste.id}
          </span>
        </div>

        <div className="url-input-group">
          <input
            type="text"
            readOnly
            value={pasteUrl}
            className="url-input"
            onClick={(e) => e.target.select()}
          />
          <button 
            type="button" 
            className={`copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>

        <div className="result-actions">
          <button 
            type="button" 
            className="btn-primary"
            onClick={() => navigate(`/p/${paste.id}`)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Open Paste
          </button>

          <button 
            type="button" 
            className="btn-secondary"
            onClick={onNewPaste}
          >
            New Paste
          </button>
        </div>
      </div>

      <p className="result-card-footer">
        Anyone with this link can view and copy the content. No account needed.
      </p>
    </div>
  );
}
