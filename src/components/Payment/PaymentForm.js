import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';

export default function PaymentForm({ cardData, setCardData }) {
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
    
  return (
    <FormContainer>
      <Cards
        cvc={cardData.cvc}
        expiry={cardData.expiry}
        name={cardData.name}
        number={cardData.number}
        focused={cardData.focus}
        callback={getIssuer}
      />
      <form>
    	<input
          type="tel"
          name="number"
          placeholder="Card Number"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="tel"
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="tel"
          name="expiry"
          placeholder="Valid Thru"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="tel"
          name="cvc"
          placeholder="CVC"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
      </form>
    </FormContainer>
  );
}

const FormContainer = styled.div`
 display: flex;
 justify-content: start;

 margin-top: 17px;

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
