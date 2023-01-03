import { Section } from '../Dashboard/Section';
import { useTicket } from '../../hooks/api/useTicket';
import ActivityList from './ActivityList';

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
  const mockData = [
    { capacity: 20, name: 'Minecraft: Montando o PC Ideal', startsAt: new Date('22 January 2023 09:00 UTC'), endsAt: new Date('22 January 2023 10:00 UTC') },
    { capacity: 10, name: 'Palestra Clean Code', startsAt: new Date('22 January 2023 10:00 UTC'), endsAt: new Date('22 January 2023 11:00 UTC') },
    { capacity: 100, name: 'Shark Tank: Drivent!', startsAt: new Date('23 January 2023 09:00 UTC'), endsAt: new Date('23 January 2023 10:30 UTC') },
  ];

  return (
    <ActivityList>
      <ActivityList.Area
        name={'Auditório Principal'}
        activities={mockData}
      />
      <ActivityList.Area
        name={'Auditório Lateral'}
        activities={mockData}
      />
      <ActivityList.Area
        name={'Sala de Workshop'}
        activities={mockData}
      />
    </ActivityList>
  );
}
