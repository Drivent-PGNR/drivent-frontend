import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useChangeBooking({ bookingId }) {
  const token = useToken();

  const {
    loading: bookingLoading,
    error: bookingError,
    act: changeBooking
  } = useAsync((data) => bookingApi.putBooking(token, bookingId, data), false);

  return {
    bookingLoading,
    bookingError,
    changeBooking
  };
}
