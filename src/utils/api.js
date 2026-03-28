const API_BASE_URL = 'https://docsai-backend-5tkb.onrender.com/api';

export async function uploadDocument(file) {
  const formData = new FormData();
  formData.append('document', file);

  // Create an AbortController with a 5-minute timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5 * 60 * 1000); // 5 minutes

  try {
    const response = await fetch(`${API_BASE_URL}/upload/process`, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Upload failed');
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Upload timed out. Please try a smaller file.');
    }
    throw error;
  }
}

export async function checkHealth() {
  const response = await fetch(`${API_BASE_URL}/upload/health`);
  return response.json();
}

export async function clearCache() {
  const response = await fetch(`${API_BASE_URL}/upload/cache/clear`, {
    method: 'POST',
  });
  return response.json();
}
