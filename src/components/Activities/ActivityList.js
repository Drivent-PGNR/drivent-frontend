import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import ActivityCapacity from './ActivityCapacity';

export default function ActivityList({ activities, children }) {
  const [areas, setAreas] = useState({});

  useEffect(() => {
    if (activities?.length > 0) {
      activities.forEach(activity => {
        const { name } = activity.Building;
        const auxAreas = areas;

        if (!areas[name]) {
          auxAreas[name] = [];
        }

        auxAreas[name].push(activity);
        setAreas(auxAreas);
      });
    }
  }, [activities]);

  return (
    <Wrapper>
      {activities && Object.entries(areas).map((area, index) => {
        const [name, list] = area;
        return <ActivityList.Area key={index} name={name} activities={list} />;
      })}
      {children}
    </Wrapper>
  );
}

ActivityList.Area = ({ name: areaName, activities }) => {
  return (
    <Area>
      <h3>{areaName}</h3>
      <ul>
        {activities?.map(({ id, name, startsAt, endsAt, capacity, _count }) => {
          const [start, end] = [new Date(startsAt), new Date(endsAt)];
          const duration = end.getHours() - start.getHours();
          const timeWindow = start.toTimeString().slice(0, 5) + ' - ' + end.toTimeString().slice(0, 5);

          return (
            <Area.Card duration={duration} key={id}>
						  <div>
                <h5 className='title'>{name}</h5>
                <p>{timeWindow}</p>
						  </div>
              <ActivityCapacity capacity={capacity} tickets={_count.Ticket} />
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
  height: ${props => `${80 * props.duration}px`};
  padding: 0.75rem;
  font-size: 12px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;

  div {
    width: 75%;
  }

  div h5{
    font-size: inherit;
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  div p{
    font-size: inherit
  }

  &:not(:last-of-type){
    margin-bottom: 0.75rem;
  }

  &:hover{
    filter: brightness(0.90);
  }
`;
