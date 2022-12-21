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
