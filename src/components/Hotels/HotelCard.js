import styled from 'styled-components';

function createAcomodationsMessage(rooms) {
  const containSingleRoom = roomsContains(1, rooms);
  const containDoubleRoom = roomsContains(2, rooms);
  const containTripleRoom = roomsContains(3, rooms);

  if (containSingleRoom && containDoubleRoom && containTripleRoom) return 'Single, Double e Triple';
  const arr = [containSingleRoom ? 'Single' : false, containDoubleRoom ? 'Double' : false, containTripleRoom ? 'Triple' : false].filter(e => e);

  return arr.join(' e ');
}

function roomsContains(num, Rooms) {
  if (Rooms.some(room => room.capacity === num)) return true;
  if (num >= 3 && Rooms.some(room => room.capacity >= 3)) return true;
  return false;
}

export default function HotelCard({ id, name, image, Rooms, selectedHotel, setSelectedHotel }) {
  const acommodationsMessage = createAcomodationsMessage(Rooms);
  let vacancies = 0;
  Rooms.forEach((room) => {
    const capacity = room.capacity;
    const bookings = room.Booking.length;
    vacancies += (capacity - bookings);
  });

  return (
    <HotelCardWrapper onClick={() => setSelectedHotel(id)} selected={id === selectedHotel}>
      <img src={image} alt='' />
      <h4>{name}</h4>
      <div>
        <h6>Tipos de acomodação:</h6>
        <p>{acommodationsMessage}</p>
      </div>
      <div>
        <h6>Vagas disponíveis:</h6>
        <p>{vacancies}</p>
      </div>
    </HotelCardWrapper>
  );
}

const HotelCardWrapper = styled.div`
  width: 196px;
  height: 264px;
  background-color: ${props => props.selected ? '#FFEED2' : '#EBEBEB' };
  border-radius: 10px;
  padding: 16px 14px;
  margin-right: 1rem;
  margin-bottom: 1rem;
  scale: 1;
  cursor: pointer;

  &:active {
    transform: scale(0.97);
  }

  > img {
    border-radius: 5px;
    width: 168px;
    height: 109px;
  }

  > h4 {
    margin-top: 0.6rem;
    font-family: 'Roboto', sans-serif;
    font-size: 20px; 
    color: #343434;
    line-break: anywhere;
  }

  > div {
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    color: #343434;
    margin-top: 0.8rem;
  }

  > div > h6 {
    font-weight: 700;
    margin-bottom: 0.3rem;
  }
`;
