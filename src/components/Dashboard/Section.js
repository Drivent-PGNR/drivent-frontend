import { Typography } from '@material-ui/core';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import { Subtitle } from '../Subtitle';

export function Section({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
}

Section.Title = ({ children }) => {
  return <StyledTypography variant="h4">{children}</StyledTypography>;
};

Section.Subtitle = ({ children }) => {
  return <Subtitle>{children}</Subtitle>;
};

Section.Warning = ({ children }) => {
  return <StyledWarning><p>{children}</p></StyledWarning>;
};

Section.Button = ({ children, ...otherProps }) => {
  return <StyledButton {...otherProps}>{children}</StyledButton>;
};

Section.Loading = ({ color }) => {
  return <StyledLoader>
    <Loader color={color ? color : '#8E8E8E'} />
  </StyledLoader>;
};

const Container = styled.section`
  height: 100%;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const StyledButton = styled.button`
  font-size: 14px;
  padding: 0.5rem 0.75rem;
  margin: 1.2rem 0.5rem ;
  border-radius: 5px;
  border: none;
  background-color: ${props => props.selected ? '#FFD37D' : '#E0E0E0' };
  box-shadow: 0px 2px 10px #00000040;
  cursor: pointer;
  pointer-events: ${props => props.disabled && 'none'};
  
  &:hover{
    filter: brightness(0.9)
  }
`;

const StyledWarning = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;

  p{
    width: 60%;
    text-align: center;
    font-size: 1.25rem;
    line-height: 1.25em;
    color: #8E8E8E
  }
`;

const StyledLoader = styled(StyledWarning)`
  position: relative;
  top: -4.5px;
`;
