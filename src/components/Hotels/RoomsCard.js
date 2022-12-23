import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useChangeBooking from '../../hooks/api/useChangeBooking';
import RoomCard from './RoomCard';
import { useState, useEffect } from 'react';
import useCreateBooking from '../../hooks/api/useCreateBooking';
import { toast } from 'react-toastify';
import useToken from '../../hooks/useToken';
import { getHotel } from '../../services/hotelApi';

export default function RoomsCard({ selectedHotel, setChange, booking, next }) {
  const [hotel, setHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const { bookingLoading, CreateBooking } = useCreateBooking(selectedRoom);
  const { changeBooking } = useChangeBooking({ bookingId: booking?.id });
  const token = useToken();

  useEffect(() => {
    getHotel(token, selectedHotel)
      .then(res => {
        setHotel(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [selectedHotel]);

  async function handleSubmit() {
    try {
      if(booking) {
        await changeBooking({ roomId: selectedRoom });
      }
      else {
        await CreateBooking({ roomId: selectedRoom });
      }
      setChange(false);
      toast('Reserva criada com sucesso!');
      next();
    } catch (err) {
      toast('Não foi possível realizar o booking!');
    }
  };

  return (
    <>
      <Message variant="h6">Ótima pedida! Agora escolha um quarto para você</Message>
      <>
      
        {hotel &&
          <Room>
            {hotel.Rooms.map(r => <RoomCard key={r.id} {...r} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />)}
          </Room>
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
