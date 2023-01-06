import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import ActivityCard from './ActivityCard';

export default function ActivityList({ activities, children }) {
  const [areasList, setAreasList] = useState([]);

  useEffect(() => {
    if (activities?.length > 0) {
      let aux = {};
      activities.forEach(activity => {
        const { name } = activity.Building;
        const auxAreas = aux;
        
        if (!aux[name]) {
          auxAreas[name] = [];
        }

        auxAreas[name].push(activity);
        aux = { ...auxAreas };
      });
      setAreasList(Object.entries(aux));
    }
  }, [activities]);
  
  return (
    <Wrapper>
      {areasList.length > 0 && areasList.map((area, index) => {
        const [name, list] = area;
        return <ActivityList.Area key={index} name={name} activities={list} />;
      })}
      {children}
    </Wrapper>
  );
}

ActivityList.Area = ({ name: areaName, activities }) => {
  const [refresh, setRefresh] = useState(true);

  return (
    <Area>
      <h3>{areaName}</h3>
      <ul>
        {activities?.map((activity) => <ActivityCard key={activity.id} {...activity} refresh={refresh} setRefresh={setRefresh} />)}
      </ul>
    </Area>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  overflow-x: auto;
  width: 100%;
  height: 80%;
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

