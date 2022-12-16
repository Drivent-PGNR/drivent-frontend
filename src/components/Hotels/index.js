import styled from 'styled-components';
import { Title } from '../Title';
import { Subtitle } from '../Subtitle';
import useHotel from '../../hooks/api/useHotel';
import HotelCard from './HotelCard';

export default function Hotels() {
  const { hotels } = useHotel();

  return (
    <>
      <TitleSpacing>Escolha de hotel e quarto</TitleSpacing>
      <Subtitle>Primeiro, escolha seu hotel</Subtitle>
      <HotelsCardContainer>
        {hotels ? (
          hotels.map(hotel => <HotelCard key={hotel.id} {...hotel} />)
        ) : (<></>)}
      </HotelsCardContainer>
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
