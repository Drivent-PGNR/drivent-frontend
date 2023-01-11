import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AiFillGithub as GithubLogo } from 'react-icons/ai';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label, OauthButton } from '../../components/Auth';
import { Section } from '../../components/Dashboard/Section';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';

import { getGitHubData, redirectToGitHub } from './github';
import Divider from '../../components/Form/Divider';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { loadingSignIn, signIn } = useSignIn();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      gitHubLogin(code);
    }
  }, []);

  async function gitHubLogin(code) {
    setLoading(true);

    try {
      const userData = await getGitHubData(code);
      completeLogin(userData);
    } catch (error) {
      toast('Não foi possível fazer o login!');
      setLoading(false);
    }
  }

  async function submit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const userData = await signIn(email, password);
      completeLogin(userData);
    } catch (err) {
      toast('Não foi possível fazer o login!');
      setLoading(false);
    }
  }

  async function completeLogin(userData) {
    setUserData(userData);
    toast('Login realizado com sucesso!');
    navigate('/dashboard');
  }

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      {loading
        ? <Section.Loading />
        : <>
          <Row>
            <Label>Entrar</Label>
            <form onSubmit={submit}>
              <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
              <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
              <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>Entrar</Button>
              <Divider>ou</Divider>
              <OauthButton variant={'contained'} fullWidth onClick={redirectToGitHub}>
                <GithubLogo size={36} />
                <span>Github</span>
              </OauthButton>
            </form>
          </Row>
          <Row>
            <Link to="/enroll">Não possui login? Inscreva-se</Link>
          </Row>
        </>
      }
    </AuthLayout>
  );
}
