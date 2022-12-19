import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { Subtitle } from '../Subtitle';

export function Section({ children }) {
  return (
    <>
      {children}
    </>
  );
}

Section.Title = ({ children }) => {
  return <StyledTypography variant="h4">{children}</StyledTypography>;
};

Section.Subtitle = ({ children }) => {
  return <Subtitle>{children}</Subtitle>;
};

Section.Button = ({ children, ...otherProps }) => {
  return <StyledButton {...otherProps}>{children}</StyledButton>;
};

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const StyledButton = styled.button`
  font-size: 14px;
  padding: 0.5rem 0.75rem;
  margin: 1rem 0;
  border-radius: 5px;
  border: none;
  background-color: #E0E0E0;
  box-shadow: 0px 2px 10px #00000040;
  cursor: pointer;
  pointer-events: ${props => props.disabled && 'none'};
  
  &:hover{
    filter: brightness(0.9)
  }
`;
