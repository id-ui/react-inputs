import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { withPropsTable } from 'storybook-addon-react-docgen';
import { TYPES } from './constants';
import TextInput from './TextInput';

export default {
  title: 'TextInput',
  component: TextInput,
  argTypes: {
    value: {
      control: 'text',
      description: 'input value',
    },
    onChange: {
      action: 'onChange',
      description: 'onChange input handler',
    },
    onlyValue: {
      control: 'boolean',
      description: 'call onChange with input value instead of whole Event',
      defaultValue: true,
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    type: {
      control: { type: 'select', options: Object.keys(TYPES) },
      description: 'input type',
      defaultValue: 'text',
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    name: {
      control: 'text',
      description: 'input name',
    },
    placeholder: {
      control: 'text',
      description: 'input placeholder',
    },
    required: {
      control: 'boolean',
      description: 'can value be empty or not',
    },
    disabled: {
      control: 'boolean',
      description: 'is input disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'is input readOnly',
    },
    hasError: {
      control: 'boolean',
      description: 'is TextInput has error',
    },
    isClearable: {
      control: 'boolean',
      description: 'whether user can clear TextInput or not',
      defaultValue: true,
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    onClear: {
      action: 'onClear',
      description: 'onClear input handler',
    },
    clearIconPlacement: {
      control: { type: 'select', options: ['right', 'left'] },
      description: 'placement of clear icon',
      defaultValue: 'right',
      table: {
        defaultValue: { summary: 'right' },
      },
    },
    isClearIconShown: {
      disable: true,
      description:
        'function that returns true if clear icon should be show depending on current value',
      table: {
        defaultValue: { summary: 'currentValue => Boolean(currentValue)' },
      },
    },
    mask: {
      control: 'text',
      description: 'react-input-mask mask',
    },
    maskPlaceholder: {
      control: 'text',
      description: 'react-input-mask maskPlaceholder',
    },
    leftAddon: {
      disable: true,
      description: 'element, embedded to the left side of TextInput',
    },
    rightAddon: {
      disable: true,
      description: 'element, embedded to the right side of TextInput',
    },
    className: {
      control: 'text',
      description: 'TextInput container className',
    },
    colors: {
      control: 'object',
      description:
        'colors theme for different input states (default/disabled/error/focused)',
      defaultValue: TextInput.defaultProps.colors,
      table: {
        defaultValue: {
          summary: JSON.stringify(TextInput.defaultProps.colors),
        },
      },
    },
    children: {
      disable: true,
      description: 'elements, inserted right before rightAddon',
    },
    tabIndex: {
      control: 'number',
      description: 'input index for navigating using the Tab key',
    },
    autoComplete: {
      control: 'boolean',
      description: 'whether enable autocompletion or not',
    },
    autoFocus: {
      control: 'boolean',
      description: 'set focus on init',
    },
    maxlength: {
      control: 'boolean',
      description: 'max value length',
    },
  },
  decorators: [withPropsTable],
  parameters: {
    props: {
      propTablesInclude: [TextInput],
    },
  },
};

export function Playground({
  onChange,
  value: providedValue,
  onlyValue,
  ...props
}) {
  const [value, setValue] = useState(providedValue);

  useEffect(() => {
    setValue(providedValue);
  }, [providedValue]);

  const handleChange = useCallback(
    (e) => {
      setValue(onlyValue ? e : e.target.value);
      onChange(e);
    },
    [onChange, onlyValue]
  );

  return (
    <TextInput
      {...props}
      value={value}
      onChange={handleChange}
      onClear={undefined}
    />
  );
}

Playground.args = {};

const customColors = {
  default: {
    border: '#B3B3B3',
    color: '#313131',
    placeholder: '#B3B3B3',
    tag: '#14B9E4',
  },
  disabled: {
    border: '#f1eded',
    color: '#f1eded',
    tag: '#B3B3B3',
  },
  error: {
    border: '#C02908',
    color: '#C02908',
    background: '#FDDCDC',
    tag: '#C02908',
  },
  focused: {
    border: '#14B9E4',
    tag: '#11AFD9',
  },
};

const StyledTextInput = styled(TextInput)`
  min-height: 50px;
  padding: 12px 10px;
  border-radius: 15px;
  width: 500px;
  font-size: 16px;
`;

export function StylingExample({
  onChange,
  value: providedValue,
  onlyValue,
  ...props
}) {
  const [value, setValue] = useState(providedValue);

  useEffect(() => {
    setValue(providedValue);
  }, [providedValue]);

  const handleChange = useCallback(
    (e) => {
      setValue(onlyValue ? e : e.target.value);
      onChange(e);
    },
    [onChange, onlyValue]
  );

  return (
    <StyledTextInput
      {...props}
      value={value}
      onChange={handleChange}
      onClear={undefined}
      colors={customColors}
    />
  );
}

export function MaskExample({
  value: providedValue,
  onChange,
  onlyValue,
  ...props
}) {
  const [value, setValue] = useState(providedValue);

  useEffect(() => {
    setValue(providedValue);
  }, [providedValue]);

  const handleChange = useCallback(
    (e) => {
      setValue(onlyValue ? e : e.target.value);
      onChange(e);
    },
    [onChange, onlyValue]
  );

  return (
    <TextInput
      {...props}
      value={value}
      onChange={handleChange}
      onClear={undefined}
      mask="99/99/9999"
      maskPlaceholder="DD/MM/YYYY"
      placeholder="DD/MM/YYYY"
    />
  );
}
