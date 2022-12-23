import { useState } from 'react';
import styled from 'styled-components';
import { Title } from '../../../components/Title';
import Hotels from '../../../components/Hotels';
import { Booking } from '../../../components/Booking';

export default function Hotel() {
  const [screen, setScreen] = useState('hotel');
  const [booking, setBooking] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [change, setChange] = useState(false);

  function handleScreenChange() {
    setScreen('booking');
  };

  function handleScreenChangeRoom() {
    setScreen('hotel');
  };

  return (
    <>
      <TitleSpacing>Escolha de hotel e quarto</TitleSpacing>
      {screen === 'hotel' && <Hotels next={handleScreenChange} booking={booking} setBooking={setBooking} setHotel={setHotel} change={change} setChange={setChange}/>}
      
      {screen === 'booking' && <Booking next={handleScreenChangeRoom} booking={booking} hotel={hotel} change={change} setChange={setChange}/>}
    </>
  );
}

const TitleSpacing = styled(Title)`
  margin-bottom: 2.3rem;
`;
