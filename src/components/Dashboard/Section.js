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

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
