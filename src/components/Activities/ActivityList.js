import styled from 'styled-components';

export default function ActivityList({ children }) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}

ActivityList.Area = ({ name, activities }) => {
  return (
    <Area>
      <h3>{name}</h3>
      <ul>
        {activities?.map(activity => {
          const { name, startsAt, endsAt } = activity;
          const timeWindow = startsAt.toTimeString().slice(0, 5) + ' - ' + endsAt.toTimeString().slice(0, 5);

          return (
            <Area.Card>
              <h5 className='title'>{name}</h5>
              <p>{timeWindow}</p>
            </Area.Card>
          );
        })}
      </ul>
    </Area>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  overflow-x: auto;
  width: 100%;
  height: 90%;
`;

const Area = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 33%;

  h3{
    color: #7B7B7B;
    font-size: 1.10rem;
    margin: 1.25em 0
  }

  ul{
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #D7D7D7;
    border-right: none;
  }

  &:last-of-type ul{
    border-right: 1px solid #D7D7D7;
  }
`;

Area.Card = styled.li`
  background-color: #F1F1F1;
  width: 100%;
  height: 80px;
  padding: 0.75rem;
  font-size: 12px;
  cursor: pointer;

  h5{
    font-size: inherit;
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  p{
    font-size: inherit
  }

  &:not(:last-of-type){
    margin-bottom: 0.75rem;
  }

  &:hover{
    filter: brightness(0.90);
  }
`;
