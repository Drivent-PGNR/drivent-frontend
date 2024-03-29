import { useEffect, useState } from 'react';
import FinishPayment from '../../../components/Payment/FinishPayment';
import PaymentSucces from '../../../components/Payment/paymentSucces';
import Tickets from '../../../components/Tickets';
import useEnrollment from '../../../hooks/api/useEnrollment';
import styled from 'styled-components';
import * as useTicket from '../../../hooks/api/useTicket';
import { Section } from '../../../components/Dashboard/Section';

export default function Payment() {
  const [screen, setScreen] = useState('ticket');
  const [ticketType, setTicketType] = useState({ id: 0, isRemote: '', includesHotel: '', price: 0 });
  const { enrollment } = useEnrollment();
  const { ticket } = useTicket.useTicket();

  useEffect(() => {
    if (ticket) {
      if (ticket.status === 'PAID') {
        const ticketType = ticket.TicketType;
        setTicketType({
          isRemote: ticketType.isRemote ? 'Online' : 'Presencial',
          includesHotel: ticketType.includesHotel ? 'Com hotel' : 'Sem hotel',
          price: ticketType.price
        });
        setScreen('paid');
      } else {
        setScreen('payment');
      }
    } else if (!enrollment) {
      setScreen('enrollment');
    } else {
      setScreen('ticket');
    }
  }, [ticket, enrollment]);

  const handleScreenChange = () => {
    setScreen('payment');
  };
  
  return (<>
    {screen === 'ticket' && <Tickets next={handleScreenChange}/>}
    {screen === 'payment' && <FinishPayment />}
    {screen === 'paid' && 
    <><Section.Title>Ingresso e pagamento</Section.Title>
      <Section.Subtitle>Ingresso escolhido</Section.Subtitle>
      <TicketContainer>
        <p className='type'>{ticketType.isRemote === 'Online' ? 'Online' : `${ticketType.isRemote} + ${ticketType.includesHotel}`}</p>  
        <p>R$ {ticketType.price}</p>
      </TicketContainer>

      <Section.Subtitle>Pagamento</Section.Subtitle>
      <PaymentSucces /></> }
    {screen === 'enrollment' && 
    <><Section.Title>Ingresso e pagamento</Section.Title>
      <Section.Warning>Você precisa completar sua inscrição antes de prosseguir pra escolha do ingresso</Section.Warning>
    </>}
  </>);
}

const TicketContainer = styled.div`
    width: 290px;
    height: 108px;
    border-radius: 20px;
    background-color: #FFEED2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-top: 18px;
    margin-bottom: 30px;

    p {
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 14px;
        line-height: 16.41px;
        color: #898989;
    }

    .type {
        margin-bottom: 8px;

        font-size: 16px;
        line-height: 18.75px;
        color: #454545;
    }
`;
