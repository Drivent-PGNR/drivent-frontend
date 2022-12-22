import { Section } from '../Dashboard/Section';
import { useTicket } from '../../hooks/api/useTicket';

export default function ActivitiesSection() {
  const { ticket } = useTicket();

  return (
    <Section>
      <Section.Title>Escolha de Atividades</Section.Title>
      {ticket ?
        <Section.Warning>
          {(ticket.TicketType.isRemote && ticket.status === 'PAID') &&
            'Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.'}
          {(!ticket.TicketType.isRemote && ticket.status !== 'PAID') &&
            'Você precisa ter confirmado pagamento antes de fazer a escolha de atividades.'}
        </Section.Warning>
        : <Section.Loading />
      }
    </Section>
  );
}
