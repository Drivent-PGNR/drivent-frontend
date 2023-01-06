import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default function useGetDayActivity() {
  const token = useToken();
  const {
    data: dayActivity,
    loading: dayActivityLoading,
    error: dayActivityError,
    act: getDayActivity
  } = useAsync(() => activityApi.getDayActivity(token));

  return {
    dayActivity,
    dayActivityLoading,
    dayActivityError,
    getDayActivity
  };
}
