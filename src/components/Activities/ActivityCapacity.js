import { IoEnterOutline, IoCloseCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import styled from 'styled-components';

export default function ActivityCapacity({ capacity, tickets, userEnroll }) {
  const vacancy = capacity - tickets;

  return (
    <Wrapper vacancy={vacancy} userEnroll={userEnroll}>
      {userEnroll ? (
        <>
          <IoCheckmarkCircleOutline />
          <p>Inscrito</p>
        </>
      ) : (
        vacancy > 0 ? (
          <>
            <IoEnterOutline />
            <p>{vacancy} vagas</p>
          </>
        ) : (
          <>
            <IoCloseCircleOutline />
            <p>Esgotado</p>
          </>
        )
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
    --ionicon-stroke-width: 20px;
    font-size: 20px;
    margin-bottom: 0.2rem;
  }
`;
