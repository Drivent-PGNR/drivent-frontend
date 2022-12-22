import styled from 'styled-components';
import { BsPerson } from 'react-icons/bs';

export default function RoomCard({ id, name, capacity, hotelId, selectedRoom, setSelectedRoom }) {
  return (
    <>
      <RoomBox onClick={() => setSelectedRoom(id)} selected={id === selectedRoom}> 
        <h4>{name}</h4> 
        <IconBox>
          { Array.from({ length: capacity }).map(() => <BsPerson size={25}/>) } 
        </IconBox>
      </RoomBox>
    </>
  );
}
  
const RoomBox = styled.div`
  width: 190px;
  height: 45px;
  border-width: medium;
  border-style: solid;
  border: 1px solid #CECECE;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  cursor: pointer;
  background-color: ${props => props.selected ? '#FFEED2' : '#EBEBEB' };
  padding: 10px;

  h4{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #454545;
 
  }
  `;

const IconBox = styled.div`
 
  display: flex;
  `;
