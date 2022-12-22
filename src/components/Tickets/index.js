import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useCreateTicket from '../../hooks/api/useCreateTicket';
import * as useTicket from '../../hooks/api/useTicket';
import { Section } from '../Dashboard/Section';
import TicketCards from './TicketCards';

export default function Tickets({ next }) {
  const { ticketTypes } = useTicket.useTicketTypes();
  const { ticket } = useTicket.useTicket();
  const { CreateTicketLoading, CreateTicket } = useCreateTicket();
  const [stayOpt, setStayOpt] = useState([]);
  const [staySelected, setStaySelected] = useState({});
  const [hotelOpt, setHotelOpt] = useState([]);
  const [hotelSelected, setHotelSelected] = useState({});

  useEffect(() => {
    if (ticket) {
      next();
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
  }, [ticket, ticketTypes]);

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
  </Section>;
}
