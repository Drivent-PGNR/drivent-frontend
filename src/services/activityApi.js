import api from './api';

export async function getActivitiesByDay(token, eventDay) {
  const response = await api.get('/activities/' + eventDay, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function saveActivity(activityId, token) {
  const response = await api.post(`/activities/${activityId}/enroll`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
