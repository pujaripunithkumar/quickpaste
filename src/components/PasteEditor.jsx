import React, { useState } from 'react';

const LANGUAGES = [
  'Auto Detect',
  'Plain Text',
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'HTML',
  'CSS',
  'JSON',
  'Markdown',
  'SQL'
];

const EXPIRY_OPTIONS = [
  { label: 'Never', value: 'never' },
  { label: '10 min', value: '10m' },
  { label: '1 hour', value: '1h' },
  { label: '1 day', value: '1d' },
  { label: '7 days', value: '7d' }
];

export default function PasteEditor({ onCreatePaste, loading }) {
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('Auto Detect');
  const [expiry, setExpiry] = useState('never');

  const handleClear = () => {
    setContent('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onCreatePaste({ content, language, expiry });
  };

  return (
    <form className="editor-container" onSubmit={handleSubmit}>
      <div className="editor-box">
        <textarea
          className="editor-textarea"
          placeholder="Paste your text or code here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          spellCheck={false}
          autoFocus
        />
        <div className="editor-footer-bar">
          <span>{content.length} {content.length === 1 ? 'char' : 'chars'}</span>
          {content.length > 0 && (
            <button type="button" className="editor-clear-btn" onClick={handleClear}>
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="editor-controls-row">
        <div className="control-selectors">
          <div className="control-group">
            <label className="control-label" htmlFor="language-select">
              Language
            </label>
            <select
              id="language-select"
              className="control-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label className="control-label" htmlFor="expiry-select">
              Expires
            </label>
            <select
              id="expiry-select"
              className="control-select"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            >
              {EXPIRY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
  type="submit"
  className="btn-primary"
  disabled={!content.trim() || loading}
  style={{
    opacity: content.trim() && !loading ? 1 : 0.6,
    cursor: content.trim() && !loading ? 'pointer' : 'not-allowed'
  }}
>
  {loading ? 'Creating...' : 'Create Link'}
</button>
      </div>
    </form>
  );
}
