import styled from 'styled-components';

const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 10px 0;
  font-size: 14px;

  &::before, &::after {
    content: '';
    flex: 0 1 100%;
    border-bottom: 1px solid black;
    transform: translateY(-50%)
  }

  &::before{
    margin-right: 10px;
  }

  &::after{
    margin-left: 10px;
  }
`;

export default Divider;
