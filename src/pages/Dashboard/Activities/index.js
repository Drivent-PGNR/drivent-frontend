import ActivitiesSection from '../../../components/Activities';
import { Section } from '../../../components/Dashboard/Section';

export default function Activities() {
  return (
    <Section>
      <Section.Title>Escolha de Atividades</Section.Title>
      <ActivitiesSection />
    </Section>
  );
};
