import api from './api';

export async function insertPayment(token, body) {
  const response = await api.post('/payments/process', body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

  return response.data;
}

export async function getPayment(token) {
  const response = await api.get('/payments',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

  return response.data;
}
