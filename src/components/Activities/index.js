import { useEffect, useState } from 'react';
import { Section } from '../Dashboard/Section';
import { useTicket } from '../../hooks/api/useTicket';
import ActivityList from './ActivityList';
import ActivityContext from '../../contexts/ActivityContext';
import { getActivitiesByDay } from '../../services/activityApi';
import useToken from '../../hooks/useToken';
import useGetDayActivity from '../../hooks/api/useGetDayActivity';

export default function ActivitiesSection() {
  const { ticket } = useTicket();
  const { dayActivity } = useGetDayActivity();
  const onlineTicket = ticket?.TicketType.isRemote;
  const unpaidTicket = ticket?.status !== 'PAID';
  const [ selectedDay, setSelectedDay ] = useState();

  return (
    <Section>
      <Section.Title>Escolha de Atividades</Section.Title>
      {ticket ?
        (!onlineTicket && !unpaidTicket)
          ? 
          <>
            <Section.Subtitle >Primeiro, filtre pelo dia do evento</Section.Subtitle >
            <>
              {dayActivity ? (<>
                {dayActivity.length > 0 && (

                  dayActivity?.map(day => {
                    const dayFormated = new Date(day).toLocaleDateString('pt-BR',
                      {  weekday: 'long', day: 'numeric', month: 'numeric' });
                   
                    return <Section.Button onClick = {() => setSelectedDay(day)} style={{ textTransform: 'capitalize' }} 
                      selected={selectedDay === day}>{dayFormated.replace('-feira', '')}
                    </Section.Button >;
                  } 
                
                  )
                )
                }
                
              </>)
                :
                <></>
              } 
              {
                selectedDay && <Main selectedDay={selectedDay}/>
              }
            </>
          </>
          : (
            <Section.Warning>
              {(onlineTicket && !unpaidTicket) && 'Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.'}
              {(!onlineTicket && unpaidTicket) && 'Você precisa ter confirmado pagamento antes de fazer a escolha de atividades.'}
            </Section.Warning>
          )
        : 
        <Section.Loading />
      }
    </Section>
  );
}

function Main({ selectedDay: day }) {
  const selectedDay = new Date(day);
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
  }, [refresh, day]);

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
