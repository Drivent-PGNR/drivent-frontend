import { useState } from 'react';
import FinishPayment from '../../../components/Payment/FinishPayment';
import Tickets from '../../../components/Tickets';

export default function Payment() {
  const [staySelected, setStaySelected] = useState({});
  const [hotelSelected, setHotelSelected] = useState({});
  let screen = 'select';

  if (staySelected.name === 'Online' || Object.values(hotelSelected).length !== 0) {
    screen = 'payment';
  }
  
  return (
    screen === 'select' ? 
      <Tickets staySelected={staySelected} setStaySelected={setStaySelected} hotelSelected={hotelSelected} setHotelSelected={setHotelSelected}/>
      :
      <FinishPayment />
  );
}
