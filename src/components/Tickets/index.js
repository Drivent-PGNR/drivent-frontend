import { useState, useEffect } from 'react';
import useTicketTypes from '../../hooks/api/useTicket';
import { Section } from '../Dashboard/Section';
import TicketCards from './TicketCards';

export default function Tickets() {
  const { ticketTypes } = useTicketTypes();
  const [stayOpt, setStayOpt] = useState([]);
  const [hotelOpt, setHotelOpt] = useState([]);
  const [staySelected, setStaySelected] = useState({});
  const [hotelSelected, setHotelSelected] = useState({});

  useEffect(() => {
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
          if(ticket.includesHotel) return { ...ticket, name: 'Com Hotel', price: `+ R$ ${ticket.price - presentialPrice}` };
          return { ...ticket, name: 'Sem Hotel', price: '+ R$ 0' };
        }));
    }
  }, [ticketTypes]);

  return <Section>
    <Section.Title>Ingresso e pagamento</Section.Title>
    <Section.Subtitle>Primeiro, escolha sua modalidade de ingresso</Section.Subtitle>
    <TicketCards data={stayOpt} selected={staySelected} setSelected={setStaySelected} />

    {(staySelected.isRemote === false) && <>
      <Section.Subtitle>Ótimo! Agora escolha sua modalidade de hospedagem</Section.Subtitle>
      <TicketCards data={hotelOpt} selected={hotelSelected} setSelected={setHotelSelected} />
    </>}
  </Section>;
}
