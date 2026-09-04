const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export async function createPaste({ content, language, expiry }) {
  const expiryMap = {
    never: null,
    '10m': 600,
    '1h': 3600,
    '1d': 86400,
    '7d': 604800,
  };

  const response = await fetch(`${API_URL}/pastes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
      language,
      expires_in: expiryMap[expiry],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create paste');
  }

  const data = await response.json();

  return {
    id: data.id,
    content,
    language,
    expiry,
    expiresAt: expiryMap[expiry]
      ? Date.now() + expiryMap[expiry] * 1000
      : null,
    chars: content.length,
    lines: content.split('\n').length,
  };
}


export async function getPaste(id) {
  const response = await fetch(`${API_URL}/pastes/${id}`);

  if (response.status === 404 || response.status === 410) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Failed to fetch paste');
  }

  const data = await response.json();

  const expiresAt = data.expires_at
    ? new Date(data.expires_at).getTime()
    : null;

  return {
    id: data.id,
    content: data.content,
    language: data.language,
    createdAt: data.created_at,
    expiresAt,
    expiry: expiresAt ? 'custom' : 'never',
    chars: data.content.length,
    lines: data.content.split('\n').length,
  };
}