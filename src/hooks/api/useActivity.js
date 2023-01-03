import useAsync from '../useAsync';
import useToken from '../useToken';
import * as activityApi from '../../services/activityApi';

export function useGetActivitiesByDay(eventDay) {
  const token = useToken();

  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
    act: getActivitiesByDay
  } = useAsync(() => activityApi.getActivitiesByDay(token, eventDay));

  return {
    activities,
    activitiesLoading,
    activitiesError,
    getActivitiesByDay
  };
}
