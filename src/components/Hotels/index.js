import { useState } from 'react';
import styled from 'styled-components';
import { Title } from '../Title';
import { Subtitle } from '../Subtitle';
import useHotel from '../../hooks/api/useHotel';
import HotelCard from './HotelCard';
import Typography from '@material-ui/core/Typography';
import usePayment from '../../hooks/api/usePayment';
import RoomCard from './RoomCard';

export default function Hotels() {
  const { hotels } = useHotel();
  const { payment } = usePayment();
  const [selectedHotel, setSelectedHotel] = useState(0);

  return (
    <>
      <TitleSpacing>Escolha de hotel e quarto</TitleSpacing>
      {payment ? (<>

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
        <><RoomCard selectedHotel={selectedHotel}/></>
        : (<></>)
      }
         
    </>
  );
}

const TitleSpacing = styled(Title)`
  margin-bottom: 2.3rem;
`;

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
