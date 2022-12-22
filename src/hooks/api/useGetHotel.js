import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useGetHotel(hotelId) {
  const token = useToken();

  const {
    data: hotel,
    loading: hotelLoading,
    error: hotelError,
    act: getHotel
  } = useAsync(() => hotelApi.getHotel(token, hotelId));

  return {
    hotel,
    hotelLoading,
    hotelError,
    getHotel
  };
}
