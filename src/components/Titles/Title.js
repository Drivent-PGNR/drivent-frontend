import styled from 'styled-components';

export default function Title({ children }) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.h1`
  font-size: 34px;
  font-family: 'Roboto', sans-serif;
  color: #000;
`;
