import useAsync from '../useAsync';
import useToken from '../useToken';

import * as roomApi from '../../services/roomApi';

export default function useRoom(selectedHotel) {
  const token = useToken();
  const {
    data: room,
    loading: roomLoading,
    error: roomError,
    act: getRoom
  } = useAsync(() => roomApi.getRoom(selectedHotel, token));

  return {
    room,
    roomLoading,
    roomError,
    getRoom
  };
}
