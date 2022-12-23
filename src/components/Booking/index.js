import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Subtitle } from '../Subtitle';

function createRoomMessages({ Room, Booking }) {
  const data = {};
  const { name, capacity } = Room;
  if (capacity === 1) {
    data.name = `${name} (Single)`;
  } else if (capacity === 2) {
    data.name = `${name} (Double)`;
  } else if (capacity >= 3) {
    data.name = `${name} (Triple)`;
  }

  if (Booking.length === 1) {
    data.bookings = 'Somente você';
  }
  if (Booking.length > 1) {
    data.bookings = `Você e mais ${Booking.length - 1} pessoa(s)`;
  }

  return data;
}

export function Booking({ next, booking, setChange }) {
  const [roomData, setRoomData] = useState(null);
  const { Hotel: hotel } = booking;

  useEffect(() => {
    if (booking) {
      setRoomData(createRoomMessages(booking));
    }
  }, [booking]);

  async function handleSubmit() {
    setChange(true);
    next();
  };

  return (
    <>
      <Subtitle>Você já escolheu seu quarto:</Subtitle>
      <BookingWrapper>
        {roomData &&
        <>
          <img src={hotel.image} alt='' />
          <h4>{hotel.name}</h4>
          <div>
            <h6>Quarto reservado</h6>
            <p>{roomData.name}</p>
          </div>
          <div>
            <h6>Pessoas no seu quarto</h6>
            <p>{roomData.bookings}</p>
          </div>
        </>
        }
      </BookingWrapper>
      <ChangeRoom  onClick={handleSubmit}>
        <h4>TROCAR DE QUARTO</h4>
      </ChangeRoom>
    </>  
  );
}

const BookingWrapper = styled.div`
  width: 196px;
  height: 264px;
  background-color: #FFEED2;
  border-radius: 10px;
  padding: 16px 14px;
  font-family: 'Roboto', sans-serif;
  margin-top: 1rem;

  > img {
    border-radius: 5px;
    width: 168px;
    height: 109px;
  }

  > h4 {
    margin-top: 0.6rem;
    font-size: 20px; 
    color: #343434;
    line-break: anywhere;
  }

  > div {
    font-size: 12px;
    color: #343434;
    margin-top: 0.8rem;
  }

  > div > h6 {
    font-weight: 700;
    margin-bottom: 0.3rem;
  }
`;

const ChangeRoom = styled.div`
  width: 182px;
  height: 37px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 46px;
  cursor: pointer;

  h4{
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
  }
`;
