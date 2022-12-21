import api from './api';

export async function getPayment(token) {
  const response = await api.get('/payments', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}
