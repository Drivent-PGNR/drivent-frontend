import { useState } from 'react';
import styled from 'styled-components';
import { Title } from '../../../components/Title';
import Hotels from '../../../components/Hotels';
import { Booking } from '../../../components/Booking';

export default function Hotel() {
  const [screen, setScreen] = useState('hotel');
  const [booking, setBooking] = useState({});
  const [hotel, setHotel] = useState({});

  function handleScreenChange() {
    setScreen('booking');
  };

  return (
    <>
      <TitleSpacing>Escolha de hotel e quarto</TitleSpacing>
      {screen === 'hotel' && <Hotels next={handleScreenChange} setBooking={setBooking} setHotel={setHotel} />}
      {screen === 'booking' && <Booking booking={booking} hotel={hotel} />}
    </>
  );
}

const TitleSpacing = styled(Title)`
  margin-bottom: 2.3rem;
`;
