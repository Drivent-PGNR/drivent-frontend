import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import useCreateTicket from '../../hooks/api/useCreateTicket';
import useEnrollment from '../../hooks/api/useEnrollment';
import * as useTicket from '../../hooks/api/useTicket';
import { Section } from '../Dashboard/Section';
import TicketCards from './TicketCards';

export default function Tickets({ next }) {
  const { enrollment } = useEnrollment();
  const { ticketTypes } = useTicket.useTicketTypes();
  const { CreateTicketLoading, CreateTicket } = useCreateTicket();
  const [stayOpt, setStayOpt] = useState([]);
  const [staySelected, setStaySelected] = useState({});
  const [hotelOpt, setHotelOpt] = useState([]);
  const [hotelSelected, setHotelSelected] = useState({});
  const [noEnrollment, SetNoEnrollment] = useState(true);

  useEffect(() => {
    if (enrollment) {
      SetNoEnrollment(false);
    }

    if (ticketTypes) {
      const arr = ticketTypes
        .filter((ticket) => (ticket.isRemote || (!ticket.isRemote && !ticket.includesHotel)))
        .map(ticket => {
          if (ticket.isRemote) return { ...ticket, name: 'Online', price: `R$ ${ticket.price}` };
          return { ...ticket, name: 'Presencial', price: `R$ ${ticket.price}` };
        });
      setStayOpt(arr);

      setHotelOpt(ticketTypes
        .filter((ticket) => (!ticket.isRemote))
        .map(ticket => {
          const presentialPrice = +arr.find(stay => !stay.isRemote).price.replace('R$ ', '');
          if (ticket.includesHotel) return { ...ticket, name: 'Com Hotel', price: `+ R$ ${ticket.price - presentialPrice}` };
          return { ...ticket, name: 'Sem Hotel', price: '+ R$ 0' };
        }));
    }
  }, [ticketTypes, enrollment]);

  async function handleSubmit() {
    const ticketTypeId = getTicketType().id;
    try {
      await CreateTicket({ ticketTypeId });
      toast('Ticket criado com sucesso!');
      next();
    } catch (err) {
      toast('Não foi possível criar seu ticket.');
    }
  }

  function getTicketType() {
    if (!staySelected.id) return;

    const isOnline = staySelected.name === 'Online';
    if (isOnline) {
      return ticketTypes.find(type => type.isRemote);
    }

    const isWithoutHotel = !hotelSelected.includesHotel;
    if (isWithoutHotel) {
      return ticketTypes.find(type => !type.includesHotel && !type.isRemote);
    }

    const isWithHotel = hotelSelected.includesHotel;
    if (isWithHotel) {
      return ticketTypes.find(type => type.includesHotel);
    }
  }

  return <Section>
    <Section.Title>Ingresso e pagamento</Section.Title>
    {noEnrollment ? 
      <MessageContainer>
        <PaymentRequiredMessage variant="h6">Você precisa completar sua inscrição antes de prosseguir pra escolha do ingresso</PaymentRequiredMessage>
      </MessageContainer>
      :
      <>
        <Section.Subtitle>Primeiro, escolha sua modalidade de ingresso</Section.Subtitle>
        <TicketCards data={stayOpt} selected={staySelected} setSelected={setStaySelected} />

        {(staySelected.isRemote === false) && <>
          <Section.Subtitle>Ótimo! Agora escolha sua modalidade de hospedagem</Section.Subtitle>
          <TicketCards data={hotelOpt} selected={hotelSelected} setSelected={setHotelSelected} />
        </>}

        {(staySelected.name === 'Online' || hotelSelected.name) && <>
          <Section.Subtitle>Fechado! O total ficou em <strong>R$ {getTicketType().price}</strong>. Agora é so confirmar:</Section.Subtitle>
          <Section.Button onClick={handleSubmit} disabled={CreateTicketLoading}>RESERVAR INGRESSO</Section.Button>
        </>}
      </>}
  </Section>;
}

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
