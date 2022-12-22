import useAsync from '../useAsync';
import useToken from '../useToken';
import * as paymentApi from '../../services/paymentApi';

export function usePayment(cardData, ticketId) {
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

export function findPayment() {
  const token = useToken();
  
  const {
    data: payment,
    loading: paymentLoading,
    error: paymentError,
    act: getPayment
  } = useAsync(() => paymentApi.getPayment(token));

  return {
    payment,
    paymentLoading,
    paymentError,
    getPayment
  };
}
