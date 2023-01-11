import axios from 'axios';

export async function redirectToGitHub() {
  const GITHUB_URL = 'https://github.com/login/oauth/authorize';
  const params = {
    scope: 'user',
    client_id: process.env.REACT_APP_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI
  };

  const authURL = `${GITHUB_URL}?response_type=${params.response_type}&scope=${params.scope}&client_id=${params.client_id}&redirect_uri=${params.redirect_uri}`;
  window.location.href = authURL;
}

export async function getGitHubData(code) {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/sign-in/github`, { code });
    return data;
  } catch (error) {
    return error;
  }
}
