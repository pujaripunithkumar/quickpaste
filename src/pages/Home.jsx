import React, { useState } from 'react';
import PasteEditor from '../components/PasteEditor';
import PasteResult from '../components/PasteResult';
import { createPaste } from '../utils/api';

export default function Home({ lastCreatedPaste, setLastCreatedPaste }) {
  const [createdPaste, setCreatedPaste] = useState(lastCreatedPaste || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreatePaste = async (pasteData) => {
    try {
      setLoading(true);
      setError('');

      const newPaste = await createPaste(pasteData);

      setCreatedPaste(newPaste);

      if (setLastCreatedPaste) {
        setLastCreatedPaste(newPaste);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to create paste. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewPaste = () => {
    setCreatedPaste(null);

    if (setLastCreatedPaste) {
      setLastCreatedPaste(null);
    }
  };

  return (
    <div className="home-page">
      <section className="hero">
        <h1 className="hero-title">
          Share anything. <span className="highlight">Instantly.</span>
        </h1>

        <p className="hero-subtitle">
          Paste text or code, create a link, and share it with anyone. No account. No friction.
        </p>
      </section>

      {error && (
        <p style={{ textAlign: 'center', color: 'red', marginBottom: '1rem' }}>
          {error}
        </p>
      )}

      {createdPaste ? (
        <PasteResult
          paste={createdPaste}
          onNewPaste={handleNewPaste}
        />
      ) : (
        <PasteEditor
          onCreatePaste={handleCreatePaste}
          loading={loading}
        />
      )}

      <section id="how-it-works" className="how-it-works-section">
        <h2 className="section-title">How it works</h2>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-icon-wrapper">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>

            <div className="step-badge">Step 1</div>
            <h3 className="step-title">Paste your content</h3>

            <p className="step-desc">
              Type or paste any text or code into the editor. Choose a language and expiry if needed.
            </p>
          </div>

          <div className="step-card">
            <div className="step-icon-wrapper">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>

            <div className="step-badge">Step 2</div>
            <h3 className="step-title">Create a link</h3>

            <p className="step-desc">
              Hit &ldquo;Create Link&rdquo; and get a short, unique URL for your paste in an instant.
            </p>
          </div>

          <div className="step-card">
            <div className="step-icon-wrapper">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </div>

            <div className="step-badge">Step 3</div>
            <h3 className="step-title">Share it</h3>

            <p className="step-desc">
              Send the link to anyone. They open it, read the content, and copy it &mdash; no account needed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}