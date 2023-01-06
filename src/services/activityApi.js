import api from './api';

export async function getDayActivity(token) {
  const response = await api.get('/activities/dayActivities', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }); 
  return response.data;
}
