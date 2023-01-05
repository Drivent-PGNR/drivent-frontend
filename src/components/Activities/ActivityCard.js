import { toast } from 'react-toastify';
import styled from 'styled-components';
import useSaveActivity from '../../hooks/api/useSaveActivity';
import ActivityCapacity from './ActivityCapacity';

export default function ActivityCard({ id, name, startsAt, endsAt, capacity, _count, refresh, setRefresh }) {
  const [start, end] = [new Date(startsAt), new Date(endsAt)];
  const duration = end.getHours() - start.getHours();
  const timeWindow = start.toTimeString().slice(0, 5) + ' - ' + end.toTimeString().slice(0, 5);
  const { saveActivityLoading, saveActivity } = useSaveActivity(id);

  async function handleSubmit() {
    try {
      await saveActivity(id);
      setRefresh(!refresh);
      toast('Inscrição realizada com sucesso');
    } catch (err) {
      toast('Não foi possível realizar a inscrição na atividade');
    }
  }

  return (
    <Card duration={duration} key={id} onClick={handleSubmit} disabled={saveActivityLoading}>
      <div>
        <h5 className='title'>{name}</h5>
        <p>{timeWindow}</p>
      </div>
      <ActivityCapacity capacity={capacity} tickets={_count.Ticket} />
    </Card>
  );
}

const Card = styled.li`
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
