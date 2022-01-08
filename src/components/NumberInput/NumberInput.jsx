import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'components/TextInput';
import { omit } from 'lodash';
import { useNumberInput } from './hooks';

function NumberInput(props, ref) {
  const numberInputProps = useNumberInput(props);

  return (
    <TextInput
      {...props}
      {...numberInputProps}
      type="text"
      onlyValue={false}
      ref={ref}
    />
  );
}

const NumberInputWithRef = React.forwardRef(NumberInput);

NumberInputWithRef.propTypes = {
  ...omit(TextInput.propTypes, ['type']),
  thousandsSeparator: PropTypes.string,
  countOfDigitsAfterPoint: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
};

NumberInputWithRef.defaultProps = {
  ...omit(TextInput.defaultProps, ['type']),
  thousandsSeparator: ' ',
};

export default NumberInputWithRef;
