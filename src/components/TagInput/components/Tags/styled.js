import styled from 'styled-components';
import Icon from '@idui/react-icon';

export const RemoveIcon = styled(Icon).attrs({
  name: 'cross',
  size: '0.8rem',
  pointer: true,
  color: '#FFFFFF',
})`
  margin-left: 0.6rem;
`;

export const Tag = styled.span`
  margin-right: 0.6rem;
  display: inline-flex;
  align-items: center;
  border-radius: 3rem;
  transition: background-color 0.3s linear;
  padding: 0 0.6rem;
  height: 2.1rem;
  font-size: 1rem;
  line-height: 1;
  vertical-align: middle;
  cursor: pointer;
  color: #ffffff;
`;
