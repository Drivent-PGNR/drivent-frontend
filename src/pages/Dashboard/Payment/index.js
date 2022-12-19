import { useState } from 'react';
import FinishPayment from '../../../components/Payment/FinishPayment';
import Tickets from '../../../components/Tickets';

export default function Payment() {
  const [screen, setScreen] = useState('ticket');

  const handleScreenChange = () => {
    setScreen('payment');
  };
  
  return (<>
    {screen === 'ticket' && <Tickets next={handleScreenChange}/>}
    {screen === 'payment' && <FinishPayment />}
  </>);
}
