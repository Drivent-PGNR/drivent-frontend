import React from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import styled from 'styled-components';
import * as usePayment from '../../hooks/api/usePayment';
import { toast } from 'react-toastify';
import { Section } from '../Dashboard/Section';

export default function PaymentForm({ cardData, setCardData, ticketId, setPaymentSucces }) {
  const handleInputChange = (e) => {
    setCardData({ ...cardData, 
      [e.target.name]: e.target.value });
  };

  const handleInputFocus = (e) => {
    setCardData({ ...cardData, focus: e.target.name });
  };

  const getIssuer = ({ issuer }, isValid) => {
    setCardData({ ...cardData, issuer });
  };

  const { insertPayment } = usePayment.usePayment(cardData, ticketId);  

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await insertPayment();
      setPaymentSucces(true);
    } catch (err) {
      toast('Não foi possível realizar o pagamento!');
    }
  };

  return (
    <>
      <FormContainer>
        <Cards
          cvc={cardData.cvc}
          expiry={cardData.expiry}
          name={cardData.name}
          number={cardData.number}
          focused={cardData.focus}
          callback={getIssuer}
        />
        <form onSubmit={handleSubmit} id='cardForm'>
    	    <input
            type="tel"
            name="number"
            placeholder="Card Number"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            maxLength="16"
            required
          />
          <input
            type="tel"
            name="name"
            placeholder="Name"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
          <input
            type="tel"
            name="expiry"
            placeholder="Valid Thru"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
            minLength="4"
            maxLength="4"
          />
          <input
            type="tel"
            name="cvc"
            placeholder="CVC"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
            minLength="3"
            maxLength="3"
          />
        </form>
      </FormContainer>
      <Section.Button type="submit" form='cardForm'>FINALIZAR PAGAMENTO</Section.Button>
    </>
  );
}

const FormContainer = styled.div`
 display: flex;
 justify-content: start;

 margin-top: 17px;
 margin-bottom: 20px;

 .rccs {
  margin: 0 15px 0 0 
 }

 form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
 }

 input {
  width: 250px;
  height: 35px;
  font-size: 15px;
  padding-left: 10px;
  border: 1px solid #d5dbdb;
  border-radius: 5px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 23px;
 }
`;
