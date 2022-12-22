import * as useTicket from '../../hooks/api/useTicket';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Subtitle } from '../Subtitle';
import useHotel from '../../hooks/api/useHotel';
import useBooking from '../../hooks/api/useBooking';
import HotelCard from './HotelCard';
import Typography from '@material-ui/core/Typography';
import RoomsCard from './RoomsCard';

export default function Hotels({ next, setBooking, setHotel }) {
  const { ticket } = useTicket.useTicket();
  const { hotels } = useHotel();
  const [selectedHotel, setSelectedHotel] = useState(0);
  const [verifyPayment, setverifyPayment] = useState(0);
 
  useEffect(() => {
    if (ticket) {
      setverifyPayment(ticket.status);
    }
  }, [ticket]); 
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
      {verifyPayment ? (<>

        {hotels ? (<>

          <Subtitle>Primeiro, escolha seu hotel</Subtitle>
          <HotelsCardContainer>
            {hotels ? (

              hotels.map(hotel => <HotelCard key={hotel.id} {...hotel} selectedHotel={selectedHotel} setSelectedHotel={setSelectedHotel} />)
            )            
              : 
              (<></>)
            }
          </HotelsCardContainer>
        </>)
          :
          (<>
            <MessageContainer>
              <ErrorMessage variant="h6">Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</ErrorMessage>
            </MessageContainer> </>)
        }      
      </>)  

        :(<>
          <MessageContainer>
            <ErrorMessage variant="h6">Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</ErrorMessage>
          </MessageContainer> </>)
      }

      {selectedHotel ? 
        <><RoomsCard selectedHotel={selectedHotel}/></>
        : (<></>)
      }
         
    </>
  );
}

const HotelsCardContainer = styled.section`
  flex-wrap: wrap;
  margin-top: 1rem;
  display: flex;
`;

const ErrorMessage = styled(Typography)`
  margin-bottom: 20px!important;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #8E8E8E;
  max-width: 504px;
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
