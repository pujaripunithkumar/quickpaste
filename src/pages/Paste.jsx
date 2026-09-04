import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PasteViewer from '../components/PasteViewer';
import NotFound from './NotFound';
import { getPaste } from '../utils/api';

export default function Paste() {
  const { id } = useParams();

  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPaste() {
      try {
        setLoading(true);

        const data = await getPaste(id);

        setPaste(data);
      } catch (error) {
        console.error(error);
        setPaste(null);
      } finally {
        setLoading(false);
      }
    }

    loadPaste();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '3rem',
          color: 'var(--text-muted)',
        }}
      >
        Loading paste...
      </div>
    );
  }

  if (!paste) {
    return (
      <NotFound
        isExpiredOrMissing={true}
        pasteId={id}
      />
    );
  }

  return <PasteViewer paste={paste} />;
}