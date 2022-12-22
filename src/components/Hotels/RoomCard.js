import styled from 'styled-components';
import { BsPersonFill, BsPerson } from 'react-icons/bs';

export default function RoomCard({ id, name, capacity, Booking, selectedRoom, setSelectedRoom }) {
  const filledRoom = (capacity === Booking.length);
  const booking = [...Booking];

  for (let i=0; i<capacity; i++) {
    if(!booking[i]) {
      booking[i]= false;
    }
  }  

  if(selectedRoom===id) {
    const index = booking.findIndex(element => element===false);
    booking[index] = true;
  }

  booking.reverse();

  function handleClick(id) {
    if(filledRoom) {
      return;
    }
    setSelectedRoom(id);
  }
  
  return (
    <>
      <RoomBox onClick = { () => handleClick(id)} selected={id === selectedRoom } disabled = {filledRoom}> 
        <h4>{name}</h4> 
        <IconContainer>
          { booking.map((element, index) => 
            element 
              ?
              <IconBox key={index} selectedBox={element===true} disabled = {filledRoom}>
                <BsPersonFill size={25}/>
              </IconBox>
              :
              <BsPerson key={index} size={25}/>

          ) } 
        </IconContainer>
      </RoomBox>
    </>
  );
}
  
const RoomBox = styled.button`
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
  background-color: ${props => {
    if(props.disabled) {
      return '#CECECE';
    }
    else if(props.selected) {
      return '#FFEED2';
    }
    else {
      return '#FFFFFF';
    }
  }};

  padding: 10px;

  h4{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: ${props => props.disabled ? '#9D9D9D' : '#454545' };
 
  }
  `;

const IconContainer = styled.div`

  display: flex;
  
  `;

const IconBox = styled.div`
  
  svg {
    color: ${props => {
    if(props.disabled) {
      return '#9D9D9D';
    }
    else if(props.selectedBox) {
      return '#FF4791';
    }
    else {
      return '#000000';
    }
  }};
  }
  `;
