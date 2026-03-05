import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  changePassword: (data) => api.put('/auth/change-password', data),
};

export const attendanceAPI = {
  mark: (data) => api.post('/attendance', data),
  getByClass: (classId, params) => api.get(`/attendance/class/${classId}`, { params }),
  getStudentSummary: (studentId, params) => api.get(`/attendance/student/${studentId}/summary`, { params }),
};

export const assignmentAPI = {
  create: (data) => api.post('/assignments', data),
  getByClass: (classId) => api.get(`/assignments/class/${classId}`),
  submit: (id, data) => api.post(`/assignments/${id}/submit`, data),
  grade: (submissionId, data) => api.put(`/assignments/submissions/${submissionId}/grade`, data),
};

export default api;