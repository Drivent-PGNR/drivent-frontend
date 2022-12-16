import styled from 'styled-components';

export default function HotelCard({ id, name, image }) {
  return (
    <Wrapper>
      <img src={image} alt='' />
      <h6>{name}</h6>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 196px;
  height: 264px;
  background-color: #EBEBEB;
  border-radius: 10px;
  padding: 16px 14px;
  margin-right: 1rem;
  margin-bottom: 1rem;
  scale: 1;

  &:active {
    transform: scale(0.97);
  }

  > img {
    border-radius: 5px;
    width: 168px;
    height: 109px;
  }

  > h6 {
    margin-top: 0.6rem;
    font-family: 'Roboto', sans-serif;
    font-size: 20px; 
    color: #343434;
    line-break: anywhere;
  }
`;
