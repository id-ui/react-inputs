import React, { useCallback, useEffect, useState } from 'react';
import { omit } from 'lodash';
import textInputStory from 'components/TextInput/textInput.stories';
import NumberInput from './NumberInput';

export default {
  title: 'NumberInput',
  component: NumberInput,
  argTypes: {
    thousandsSeparator: {
      control: 'text',
      description: 'separator inserted between thousands in displayed value',
      defaultValue: ' ',
      table: {
        defaultValue: { summary: 'space (" ")' },
      },
    },
    countOfDigitsAfterPoint: {
      control: 'number',
      description:
        'count of digits shown in integral part of displayed value if value has an integral part',
    },
    max: {
      control: 'number',
      description: 'maximum input value',
    },
    min: {
      control: 'number',
      description: 'minimum input value',
    },
    ...omit(textInputStory.argTypes, ['type']),
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
    <NumberInput
      {...props}
      value={value}
      onChange={handleChange}
      onClear={undefined}
    />
  );
}

Playground.args = {};
