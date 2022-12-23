import * as useTicket from '../../hooks/api/useTicket';
import { Section } from '../Dashboard/Section';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import PaymentForm from './PaymentForm';
import PaymentSucces from './paymentSucces';

export default function FinishPayment() {
  const { ticket } = useTicket.useTicket();
  const [ticketType, setTicketType] = useState({ id: 0, isRemote: '', includesHotel: '', price: 0 });
  const [cardData, setCardData] = useState ({
    cvc: '',
    expiry: '',
    name: '',
    focus: '',
    number: '',
    issuer: ''
  });
  const [ticketId, setTickedId] = useState(0);
  const [paymentSucces, setPaymentSucces] = useState(false);

  useEffect(() => {
    if (ticket) {
      const ticketType = ticket.TicketType;
      setTickedId(ticket.id);
      setTicketType({
        isRemote: ticketType.isRemote ? 'Online' : 'Presencial',
        includesHotel: ticketType.includesHotel ? 'Com hotel' : 'Sem hotel',
        price: ticketType.price
      });
    }
  }, [ticket]);

  return <Section>
    <Section.Title>Ingresso e pagamento</Section.Title>
    {ticket ? <><Section.Subtitle>Ingresso escolhido</Section.Subtitle>
      <TicketContainer>
        <p className='type'>{ticketType.isRemote === 'Online' ? 'Online' : `${ticketType.isRemote} + ${ticketType.includesHotel}`}</p>  
        <p>R$ {ticketType.price}</p>
      </TicketContainer>

      <Section.Subtitle>Pagamento</Section.Subtitle>
      {paymentSucces ? <PaymentSucces /> 
        :  
        <PaymentForm cardData={cardData} setCardData={setCardData} ticketId={ticketId} setPaymentSucces={setPaymentSucces}/>
      }
    </> :
      <Section.Warning>Finalize a seleção do ingresso para realizar o pagamento.</Section.Warning>
    }
  </Section>;
};

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
