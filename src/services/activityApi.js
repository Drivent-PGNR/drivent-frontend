import api from './api';

export async function getActivitiesByDay(token, eventDay) {
  const response = await api.get('/activities/' + eventDay, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
