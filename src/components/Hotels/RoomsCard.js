import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useRoom from '../../hooks/api/useRoom';
import RoomCard from './RoomCard';
import { useState } from 'react';
import useBooking from '../../hooks/api/useBooking';
import { toast } from 'react-toastify';

export default function RoomsCard({ selectedHotel }) {
  const { room } = useRoom(selectedHotel);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const { bookingLoading, CreateBooking } = useBooking(selectedRoom);
   
  async function handleSubmit() {
    try {
      await CreateBooking({ selectedRoom });
      toast('Reserva criada com sucesso!');
    } catch (err) {
      toast('Não foi possível realizar o booking!');
    }
  };

  return (
    <>
      <Message variant="h6">Ótima pedida! Agora escolha um quarto para você</Message>
      <>
      
        {room ? 
          <Room>
            {room.Rooms.map(r => <RoomCard key={r.id} {...r} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom}/>)}
          </Room>      
          : 
          <></>
        }
        <ReserveButton onClick={handleSubmit} disabled={bookingLoading}>
          <h4>RESERVAR QUARTO</h4>
        </ReserveButton>
      </>
      
    </>
  );
}

const Message = styled(Typography)`
  margin-bottom: 20px!important;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8E8E8E;
  max-width: 504px;
  padding: 50px 0px;
`;

const ReserveButton = styled.div`
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

const Room = styled.div`
display: flex;
flex-direction: column;
height: 250px;
flex-wrap: wrap;
`;
