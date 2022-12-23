import api from './api';

export async function getRoom(selectedHotel, token) {
  const response = await api.get(`/hotels/${selectedHotel}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
