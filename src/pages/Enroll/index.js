import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AiFillGithub as GithubLogo } from 'react-icons/ai';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import { Row, Title, Label, OauthButton } from '../../components/Auth';
import Link from '../../components/Link';

import EventInfoContext from '../../contexts/EventInfoContext';

import useSignUp from '../../hooks/api/useSignUp';
import { redirectToGitHub } from '../SignIn/github';
import Divider from '../../components/Form/Divider';

export default function Enroll() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { loadingSignUp, signUp } = useSignUp();

  const navigate = useNavigate();

  const { eventInfo } = useContext(EventInfoContext);

  async function submit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast('As senhas devem ser iguais!');
    } else if (password.length < 6) {
      toast('Por favor, insira uma senha com pelo menos 6 caracteres.');
    } else {
      try {
        await signUp(email, password);
        toast('Inscrito com sucesso! Por favor, faça login.');
        navigate('/sign-in');
      } catch (error) {
        toast('Não foi possível fazer o cadastro!');
      }
    }
  }

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Inscrição</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Senha" minLength={6} type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Input label="Repita sua senha" minLength={6} type="password" fullWidth value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignUp}>Inscrever</Button>
          <Divider>ou</Divider>
          <OauthButton variant={'contained'} fullWidth disabled={loadingSignUp} onClick={redirectToGitHub}>
            <GithubLogo size={36} />
            <span>Github</span>
          </OauthButton>
        </form>
      </Row>
      <Row>
        <Link to="/sign-in">Já está inscrito? Faça login</Link>
      </Row>
    </AuthLayout>
  );
}
