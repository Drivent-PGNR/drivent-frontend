import api from './api';

export async function getActivitiesByDay(token, eventDay) {
  const response = await api.get('/activities/' + eventDay, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getDayActivity(token) {
  const response = await api.get('/activities/dayActivities', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }); 
  return response.data;
}
