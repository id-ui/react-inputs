import styled, { css } from 'styled-components';
import _ from 'lodash';
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
  min-height: 4rem;
  padding: 1rem 0;
  border-radius: 0.5rem;
  ${withProp(
    ['state', 'colors'],
    (state, colors) => css`
      border: 0.1rem solid ${_.get(colors, [state, 'border'], 'inherit')};
      color: ${_.get(colors, [state, 'color'], 'inherit')};
      background-color: ${_.get(colors, [state, 'background'], 'inherit')};
      ${Control} {
        &::placeholder {
          color: ${_.get(
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
        border: 0.1rem solid ${prop('colors.focused.border')};
      }
    `
  )}
`;

export const Addon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.8rem;
`;

export const AddonsWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 1.6rem;
  &:first-child {
    ${Addon}:not(:last-child) {
      padding-right: 0;
    }
  }
  &:last-child {
    ${Addon}:not(:first-child) {
      padding-left: 0;
    }
  }
`;
