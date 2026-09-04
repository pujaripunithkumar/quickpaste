import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PasteViewer({ paste }) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [shared, setShared] = useState(false);
  const navigate = useNavigate();

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(paste.content);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `QuickPaste - ${paste.id}`,
          text: 'Check out this paste on QuickPaste',
          url: url,
        });
        return;
      } catch (e) {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch (e) {
      console.error('Share failed', e);
    }
  };

  const getExpiryString = (expiry, expiresAt) => {
    if (!expiresAt || expiry === 'never') {
      return 'No expiry';
    }

    const remainingMs = expiresAt - Date.now();

    if (remainingMs <= 0) {
      return 'Expired';
    }

    const minutes = Math.ceil(remainingMs / 60000);

    if (minutes < 60) {
      return `Expires in ${minutes}m`;
    }

    const hours = Math.ceil(minutes / 60);

    if (hours < 24) {
      return `Expires in ${hours}h`;
    }

    const days = Math.ceil(hours / 24);

    return `Expires in ${days}d`;
  };

  const formatCreationDate = (date) => {
    if (!date) return 'Unknown date';

    return new Date(date).toLocaleString();
  };

  const lines = paste.content
    ? paste.content.split('\n')
    : [''];

  return (
    <div className="paste-viewer-container">

      <div className="paste-view-header">

        <div className="metadata-pills">

          {/* Language */}
          <span className="pill">
            <span className="pill-icon">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </span>

            {paste.language || 'Auto Detect'}
          </span>

          {/* Created date */}
          <span className="pill">
            <span className="pill-icon">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="18"
                  rx="2"
                  ry="2"
                />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </span>

            {formatCreationDate(paste.createdAt)}
          </span>

          {/* Expiry */}
          <span className="pill">
            <span className="pill-icon">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </span>

            {getExpiryString(
              paste.expiry,
              paste.expiresAt
            )}
          </span>

          {/* Lines */}
          <span className="pill">
            {lines.length}{' '}
            {lines.length === 1 ? 'line' : 'lines'}
          </span>

        </div>

        {/* Actions */}
        <div className="paste-view-actions">

          <button
            type="button"
            className="btn-secondary"
            onClick={handleShare}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line
                x1="8.59"
                y1="13.51"
                x2="15.42"
                y2="17.49"
              />
              <line
                x1="15.41"
                y1="6.51"
                x2="8.59"
                y2="10.49"
              />
            </svg>

            {shared ? 'Link Copied!' : 'Share'}
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={handleCopyCode}
          >
            {copiedCode ? (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>

                Copied!
              </>
            ) : (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="9"
                    y="9"
                    width="13"
                    height="13"
                    rx="2"
                  />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>

                Copy Content
              </>
            )}
          </button>

        </div>
      </div>

      {/* Code window */}
      <div className="mac-window">

        <div className="mac-titlebar">

          <div className="mac-dots">
            <span className="mac-dot red"></span>
            <span className="mac-dot yellow"></span>
            <span className="mac-dot green"></span>
          </div>

          <div className="mac-path">
            paste/{paste.id}
          </div>

          <div className="mac-meta">
            {paste.chars}{' '}
            {paste.chars === 1 ? 'char' : 'chars'}
          </div>

        </div>

        <div className="code-viewer-body">

          <div className="line-numbers">
            {lines.map((_, i) => (
              <span key={i + 1}>
                {i + 1}
              </span>
            ))}
          </div>

          <pre className="code-content">
            <code>{paste.content}</code>
          </pre>

        </div>
      </div>

      {/* Footer */}
      <div className="paste-footer-bar">

        <div className="paste-id-text">
          Paste ID: <strong>{paste.id}</strong>
        </div>

        <button
          type="button"
          className="create-link"
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            font: 'inherit',
          }}
        >
          Create your own paste &rarr;
        </button>

      </div>

    </div>
  );
}