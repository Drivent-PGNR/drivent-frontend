import * as useTicket from '../../hooks/api/useTicket';
import { Section } from '../Dashboard/Section';
import styled from 'styled-components';
import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import PaymentForm from './PaymentForm';

export default function FinishPayment() {
  const [isRemote, setIsRemote] = useState('');
  const [includesHotel, setIncludesHotel] = useState('');
  const [price, setPrice] = useState(0);
  const [cardData, setCardData] = useState ({
    cvc: '',
    expiry: '',
    name: '',
    focus: '',
    number: '',
    issuer: ''
  });

  const { ticket } = useTicket.useTicket();

  if (ticket) {
    const ticketType = useTicket.useTicketTypes().ticketTypes.filter(type => type.id === ticket.ticketId);
    setIsRemote(ticketType.isRemote ? 'Online' : 'Presencial');
    setIncludesHotel(ticketType.includesHotel ? 'Com hotel' : 'Sem hotel');
    setPrice(ticketType.price);
  }

  return <Section>
    <Section.Title>Ingresso e pagamento</Section.Title>
    {ticket ? <><Section.Subtitle>Ingresso escolhido</Section.Subtitle>
      <TicketContainer>
        <p>{isRemote === 'Online' ? 'Online' : isRemote + includesHotel}</p>  
        <p>{price}</p>
      </TicketContainer>

      <Section.Subtitle>Pagamento</Section.Subtitle>
    </> :
      <PaymentForm cardData={cardData} setCardData={setCardData}/>   
    }

    {/* <><MessageContainer>
        <PaymentRequiredMessage variant="h6">Finalize a seleção do ingresso para realizar o pagamento.</PaymentRequiredMessage>
      </MessageContainer> </> */}
    
  </Section>;
};

const TicketContainer = styled.div`
    width: 290px;
    height: 108px;
    border-radius: 20px;
    background-color: #FFEED2;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PaymentRequiredMessage = styled(Typography)`
  margin-bottom: 20px!important;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #8E8E8E;
  max-width: 411px;
`;

const MessageContainer = styled(Typography)`
  
  word-wrap: break-word;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
