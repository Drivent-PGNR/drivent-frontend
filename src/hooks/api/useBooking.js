import useAsync from '../useAsync';
import useToken from '../useToken';
import * as bookingApi from '../../services/bookingApi';

export default function useBooking() {
  const token = useToken();

  const {
    loading: bookingLoading,
    error: bookingError,
    act: CreateBooking
  } = useAsync((data) => bookingApi.insertBooking(token, data), false);

  return {
    bookingLoading,
    bookingError,
    CreateBooking
  };
}
