import { Section } from '../Dashboard/Section';
import { useTicket } from '../../hooks/api/useTicket';
import ActivityList from './ActivityList';
import { useGetActivitiesByDay } from '../../hooks/api/useActivity';

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
  const { activities } = useGetActivitiesByDay(selectedDay.getTime());

  return (
    <>
      {activities && <ActivityList activities={activities} />}
    </>
  );
}
