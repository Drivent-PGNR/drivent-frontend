import { useEffect, useState } from 'react';
import { Section } from '../Dashboard/Section';
import { useTicket } from '../../hooks/api/useTicket';
import ActivityList from './ActivityList';
import ActivityContext from '../../contexts/ActivityContext';
import { getActivitiesByDay } from '../../services/activityApi';
import useToken from '../../hooks/useToken';

export default function ActivitiesSection() {
  const { ticket } = useTicket();
  const onlineTicket = ticket?.TicketType.isRemote;
  const unpaidTicket = ticket?.status !== 'PAID';

  return (
    <Section>
      <Section.Title>Escolha de Atividades</Section.Title>
      {ticket
        ? (!onlineTicket && !unpaidTicket)
          ? <Main />
          : (
            <Section.Warning>
              {(onlineTicket && !unpaidTicket) && 'Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.'}
              {(!onlineTicket && unpaidTicket) && 'Você precisa ter confirmado pagamento antes de fazer a escolha de atividades.'}
            </Section.Warning>
          )
        : <Section.Loading />
      }
    </Section >
  );
}

function Main() {
  const selectedDay = new Date('2023-01-22'); // mock
  const [activities, setActivities] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const token = useToken();

  useEffect(() => {
    getActivitiesByDay(token, selectedDay.getTime())
      .then(res => {
        setActivities(res.data);
      })
      .catch(_err => {
        return;
      });
  }, [refresh]);

  return (
    <>
      {activities && (
        <ActivityContext.Provider value={{ refresh, setRefresh }}>
          <ActivityList activities={activities} />
        </ActivityContext.Provider>
      )}
    </>
  );
}
