import React from 'react';
import PropTypes from 'prop-types';
import components from './components';
import { TYPES } from './constants';

function Input({ type, ...props }, ref) {
  const Component = components[type] || components.text;

  return <Component type={type} ref={ref} {...props} />;
}

const InputWithRef = React.forwardRef(Input);

InputWithRef.propTypes = {
  type: PropTypes.oneOf(Object.keys(TYPES)),
};

InputWithRef.defaultProps = {
  type: TYPES.text,
};

export default InputWithRef;
