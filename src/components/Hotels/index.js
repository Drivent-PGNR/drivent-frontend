import styled from 'styled-components';
import { Title } from '../Title';
import { Subtitle } from '../Subtitle';

export default function Hotels() {
  return (
    <>
      <TitleSpacing>Escolha de hotel e quarto</TitleSpacing>
      <Subtitle>Primeiro, escolha seu hotel</Subtitle>
    </>
  );
}

const TitleSpacing = styled(Title)`
  margin-bottom: 2.3rem;
`;
