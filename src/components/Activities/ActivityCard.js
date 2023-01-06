import { useContext } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import ActivityContext from '../../contexts/ActivityContext';
import UserContext from '../../contexts/UserContext';
import useSaveActivity from '../../hooks/api/useSaveActivity';
import ActivityCapacity from './ActivityCapacity';

export default function ActivityCard({ id, name, startsAt, endsAt, capacity, _count, Ticket }) {
  const [start, end] = [new Date(startsAt), new Date(endsAt)];
  const duration = end.getHours() - start.getHours();
  const timeWindow = start.toTimeString().slice(0, 5) + ' - ' + end.toTimeString().slice(0, 5);
  const { saveActivityLoading, saveActivity } = useSaveActivity(id);
  const { userData } = useContext(UserContext);
  const { refresh, setRefresh } = useContext(ActivityContext);

  const userEnroll = Ticket?.some(element => element.Enrollment.userId === userData.user.id);

  async function handleSubmit() {
    if (userEnroll) return;

    try {
      await saveActivity(id);
      setRefresh(!refresh);
      toast('Inscrição realizada com sucesso');
    } catch (err) {
      toast('Não foi possível realizar a inscrição na atividade');
    }
  }

  return (
    <Card duration={duration} onClick={handleSubmit} disabled={saveActivityLoading || userEnroll} userEnroll={userEnroll}>
      <div>
        <h5 className='title'>{name}</h5>
        <p>{timeWindow}</p>
      </div>
      <ActivityCapacity capacity={capacity} tickets={_count.Ticket} userEnroll={userEnroll} />
    </Card>
  );
}

const Card = styled.li`
  background-color: ${props => props.userEnroll ? '#D0FFDB' : '#F1F1F1'};
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
