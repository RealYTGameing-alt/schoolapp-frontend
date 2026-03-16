import api from './api';

export const uploadFile = async (file, type = 'material') => {
  const formData = new FormData();
  formData.append('file', file);

  const endpoint = type === 'assignment' ? '/upload/assignment' : '/upload/material';

  const res = await api.post(endpoint, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.log(`Upload progress: ${progress}%`);
    },
  });

  return res.data;
};

export const getFileIcon = (url, type) => {
  if (!url) return '📄';
  if (type === 'video' || url.includes('youtube') || url.includes('youtu.be')) return '🎥';
  if (url.includes('.pdf') || type === 'pdf') return '📕';
  if (url.includes('.doc')) return '📝';
  if (url.includes('.ppt')) return '📊';
  if (url.includes('.jpg') || url.includes('.png') || url.includes('.jpeg')) return '🖼️';
  return '📄';
};