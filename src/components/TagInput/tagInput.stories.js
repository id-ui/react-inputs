import React, { useCallback, useEffect, useState } from 'react';
import textInputStory from 'components/TextInput/textInput.stories';
import styled from 'styled-components';
import TagInput from './TagInput';

export default {
  title: 'TagInput',
  component: TagInput,
  argTypes: {
    ...textInputStory.argTypes,
    value: {
      control: 'array',
      description: 'TagInput value',
      defaultValue: [],
      table: {
        defaultValue: { summary: '[]' },
      },
    },
  },
};

export function Playground({ onChange, value: providedValue, ...props }) {
  const [value, setValue] = useState(providedValue);

  useEffect(() => {
    setValue(providedValue);
  }, [providedValue]);

  const handleChange = useCallback(
    (newValue) => {
      setValue(newValue);
      onChange(newValue);
    },
    [onChange]
  );

  return <TagInput {...props} value={value} onChange={handleChange} />;
}

Playground.args = {
  placeholder: 'Press enter to add tag',
};

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

const StyledTagInput = styled(TagInput)`
  min-height: 50px;
  padding: 12px 10px;
  border-radius: 15px;
  width: 500px;
  font-size: 16px;
`;

export function StylingExample({ onChange, value: providedValue, ...props }) {
  const [value, setValue] = useState(providedValue);

  useEffect(() => {
    setValue(providedValue);
  }, [providedValue]);

  const handleChange = useCallback(
    (newValue) => {
      setValue(newValue);
      onChange(newValue);
    },
    [onChange]
  );

  return (
    <StyledTagInput
      {...props}
      value={value}
      onChange={handleChange}
      colors={customColors}
    />
  );
}

StylingExample.args = {
  placeholder: 'Press enter to add tag',
};
