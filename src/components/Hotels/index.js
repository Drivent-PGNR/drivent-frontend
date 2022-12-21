import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Subtitle } from '../Subtitle';
import useHotel from '../../hooks/api/useHotel';
import useBooking from '../../hooks/api/useBooking';
import HotelCard from './HotelCard';
import Typography from '@material-ui/core/Typography';

export default function Hotels({ next, setBooking, setHotel }) {
  const { hotels } = useHotel();
  const [selectedHotel, setSelectedHotel] = useState(0);
  const { booking } = useBooking();

  useEffect(() => {
    if(booking) {
      setBooking(booking);
      const bookedHotel = hotels.find(element => element.id === booking.Room.hotelId);
      setHotel(bookedHotel);
      next();
    }
  }, [booking, hotels]);

  return (
    <>
      {hotels ? (
        <>
          <Subtitle>Primeiro, escolha seu hotel</Subtitle>
          <HotelsCardContainer>
            {hotels.map(hotel => <HotelCard key={hotel.id} {...hotel} selectedHotel={selectedHotel} setSelectedHotel={setSelectedHotel} />)}
          </HotelsCardContainer>
        </>
      ) : (
        <MessageContainer>
          <PaymentRequiredMessage variant="h6">Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</PaymentRequiredMessage>
        </MessageContainer>
      )}
    </>
  );
}

const HotelsCardContainer = styled.section`
  flex-wrap: wrap;
  margin-top: 1rem;
  display: flex;
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
