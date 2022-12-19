import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useCreateTicket() {
  const token = useToken();

  const {
    loading: CreateTicketLoading,
    error: CreateTicketError,
    act: CreateTicket
  } = useAsync((data) => ticketApi.postTicket(data, token), false);

  return {
    CreateTicketLoading,
    CreateTicketError,
    CreateTicket
  };
}
