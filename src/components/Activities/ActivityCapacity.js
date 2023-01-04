import { IoEnterOutline, IoCloseCircleOutline } from 'react-icons/io5';
import styled from 'styled-components';

export default function ActivityCapacity({ capacity, tickets }) {
  const vacancy = capacity - tickets;
  return (
    <Wrapper vacancy={vacancy}>
      {vacancy > 0 ? (
        <>
          <IoEnterOutline />
          <p>{vacancy} vagas</p>
        </>
      ) : (
        <>
          <IoCloseCircleOutline />
          <p>Esgotado</p>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.aside`
  color: ${props => props.vacancy > 0 ? '#078632' : '#CC6666'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  width: 25%;
  border-left: 1px solid #CFCFCF;

  svg {
    font-size: 20px;
    margin-bottom: 0.2rem;
  }
`;
