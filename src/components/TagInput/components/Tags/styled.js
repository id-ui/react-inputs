import styled from 'styled-components';
import Icon from '@idui/react-icon';

export const RemoveIcon = styled(Icon).attrs({
  name: 'cross',
  size: '8px',
  pointer: true,
  color: '#FFFFFF',
})`
  margin-left: 6px;
`;

export const Tag = styled.span`
  margin-right: 6px;
  display: inline-flex;
  align-items: center;
  border-radius: 30px;
  transition: background-color 0.3s linear;
  padding: 0 6px;
  height: 21px;
  font-size: 10px;
  line-height: 1;
  vertical-align: middle;
  cursor: pointer;
  color: #ffffff;
`;
