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
        <p className='type'>{isRemote === 'Online' ? 'Online' : `${isRemote} + ${includesHotel}`}</p>  
        <p>R$ {price}</p>
      </TicketContainer>

      <Section.Subtitle>Pagamento</Section.Subtitle>
      <PaymentForm cardData={cardData} setCardData={setCardData}/>
      <Button>FINALIZAR PAGAMENTO</Button> 
    </> :
      <><MessageContainer>
        <PaymentRequiredMessage variant="h6">Finalize a seleção do ingresso para realizar o pagamento.</PaymentRequiredMessage>
      </MessageContainer> </>  
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

    margin-top: 17px;
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

const Button = styled.button`
  width: 182px;
  height: 37px;
  border-radius: 4px;
  background-color: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);

  margin-top: 37px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 16.41px;
  color: black;
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
