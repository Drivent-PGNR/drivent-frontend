import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useRoom from '../../hooks/api/useRoom';

export default function RoomCard(selectedHotel) {
  const { room } = useRoom(selectedHotel);
 
  return (
    <>
      <Message variant="h6">Ótima pedida! Agora escolha um quarto para você</Message>
      {room ? <></>
        :
        <></>
      }
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
  text-align: center;
  color: #8E8E8E;
  max-width: 504px;
  padding: 50px 0px;
`;
