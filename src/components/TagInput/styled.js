import styled, { css } from 'styled-components';
import { TextInput, Control } from 'components/TextInput';
import { ifProp, prop, withProp } from 'styled-tools';
import { Tag } from './components/Tags/styled';

export const Container = styled(TextInput)`
  flex-direction: row-reverse;
  flex-wrap: wrap;

  ${Control} {
    flex: auto;
    min-width: 2rem;
    width: auto;
  }

  ${Tag} {
    ${withProp(
      ['state', 'colors'],
      (state, colors) => css`
        background-color: ${colors[state].tag || 'inherit'};
      `
    )}
    ${ifProp(
      {
        state: 'default',
      },
      css`
        &:hover {
          background-color: ${prop('colors.focused.tag')};
        }
      `
    )}
  }
`;
