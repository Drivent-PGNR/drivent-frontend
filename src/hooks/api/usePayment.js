import useAsync from '../useAsync';
import useToken from '../useToken';
import * as paymentApi from '../../services/paymentApi';

export default function usePayment(cardData, ticketId) {
  const token = useToken();
  const body = { cardData, ticketId };

  const {
    data: payment,
    loading: paymentLoading,
    error: paymentError,
    act: insertPayment
  } = useAsync(() => paymentApi.insertPayment(token, body), false);

  return {
    payment,
    paymentLoading,
    paymentError,
    insertPayment
  };
}
