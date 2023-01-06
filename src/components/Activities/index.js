import { Section } from '../Dashboard/Section';
import { useTicket } from '../../hooks/api/useTicket';
import useGetDayActivity from '../../hooks/api/useGetDayActivity';

export default function ActivitiesSection() {
  const { ticket } = useTicket();
  const { dayActivity } = useGetDayActivity();
  const onlineTicket = ticket?.TicketType.isRemote;
  const unpaidTicket = ticket?.status !== 'PAID';

  return (
    <>
      <Section.Title>Escolha de Atividades</Section.Title>
      {ticket ?
        (!unpaidTicket)
          ? 
          <>
            <Section.Subtitle >Primeiro, filtre pelo dia do evento</Section.Subtitle >
            <>
              {dayActivity ? (<>
                {dayActivity.length > 0 && (

                  dayActivity?.map(day => 
                
                    <Section.Button style={{ textTransform: 'capitalize' }}>{day}
                    </Section.Button >)
                )
                }
              </>)
                :
                <></>
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
    </>
  );
}
