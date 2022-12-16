import styled from 'styled-components';

export default function TicketCards({ data, selected, setSelected }) {
  return (
    <TicketCardsContainer>
      {data.map((ticket) => (
        <CardContainer key={ticket.id} isSelected={selected.id === ticket.id} onClick={() => setSelected(ticket)}>
          <h6>{ticket.name}</h6>
          <p>{ticket.price}</p>
        </CardContainer>
      ))}
    </TicketCardsContainer>
  );
}

const TicketCardsContainer = styled.ul`
  display: flex;
  margin: 1rem 0 2rem;
`;

const CardContainer = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 150px;
  height: 150px;
  padding: 1.5rem;
  border: 1px solid #CECECE;
  border-radius: 20px;
  cursor: pointer;
  ${props => props.isSelected && 'background-color: #FFEED2; border: none'};

  &:not(:last-of-type){
    margin-right: 1.5rem;
  }

  h6, p{
    font-family: 'Roboto', sans-serif
  }

  h6{
    margin-bottom: 0.5rem;
  }

  p{
    font-size: 14px;
    color: #898989;
    font-weight: 400
  }
`;
