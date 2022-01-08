import styled, { css } from 'styled-components';
import { get } from 'lodash';
import { ifProp, prop, withProp } from 'styled-tools';

export const Control = styled.input`
  flex: 1;
  outline: none;
  border: none;
  vertical-align: middle;
  font: inherit;
  background-color: inherit;
  color: inherit;
`;

export const Container = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 10px 0;
  border-radius: 5px;
  ${withProp(
    ['state', 'colors'],
    (state, colors) => css`
      border: 1px solid ${get(colors, [state, 'border'], 'inherit')};
      color: ${get(colors, [state, 'color'], 'inherit')};
      background-color: ${get(colors, [state, 'background'], 'inherit')};
      ${Control} {
        &::placeholder {
          color: ${get(
            colors,
            [state, 'placeholder'],
            colors.default.placeholder || 'inherit'
          )};
        }
      }
    `
  )}
  ${ifProp(
    {
      state: 'default',
    },
    css`
      &:focus-within {
        border: 1px solid ${prop('colors.focused.border')};
      }
    `
  )}
`;

export const Addon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
`;

export const AddonsWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 16px;
  &:first-child {
    ${Addon}:not(:last-child) {
      padding-right: 0;
    }
  }
  &:last-child {
    margin-left: auto;
    ${Addon}:not(:first-child) {
      padding-left: 0;
    }
  }
`;
