import useAsync from '../useAsync';
import useToken from '../useToken';
import * as createBookingApi from '../../services/createBookingApi';

export default function useCreateBooking() {
  const token = useToken();

  const {
    loading: bookingLoading,
    error: bookingError,
    act: CreateBooking
  } = useAsync((data) => createBookingApi.insertBooking(token, data), false);

  return {
    bookingLoading,
    bookingError,
    CreateBooking
  };
}
