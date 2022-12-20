import styled from 'styled-components';
import succesIcon from '../../assets/images/success.png';

export default function PaymentSucces() {
  return (
    <Container>
      <img src={succesIcon} alt='success icon'/>
      <TextContainer>
        <p className='bold'>Pagamento confirmado!</p>
        <p>Prossiga para escolha de hospedagem e atividades</p>
      </TextContainer>
    </Container>);
}

const Container = styled.div`
    display: flex;
    align-items: center;

    margin-top: 17px;
`;

const TextContainer = styled.div`
    p {
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 16px;
        line-height: 18.75px;
        color: #454545;
        margin-left: 13px;
    }

    .bold {
        font-weight: 700;
    }
`;
