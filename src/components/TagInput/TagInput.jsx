import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import getInputState from 'helpers/getInputState';
import { TextInput } from 'components/TextInput';
import Tags from './components/Tags';
import { Container } from './styled';

function TagInput({
  value,
  onChange,
  disabled,
  hasError,
  clearIconPlacement,
  ...inputProps
}) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = useCallback(
    (e) => {
      // Enter
      if (e.keyCode === 13) {
        e.preventDefault();
        if (e.target.value) {
          onChange(_.uniq([...value, e.target.value]));
          setInputValue('');
        }
        // Backspace, Delete
      } else if ([8, 46].includes(e.keyCode) && !e.target.value) {
        onChange(value.slice(0, value.length - 1));
      }
    },
    [onChange, value]
  );

  const handleClear = useCallback(() => {
    setInputValue('');
    onChange([]);
  }, [onChange]);

  const isClearIconShown = useCallback(() => value.length > 0, [value]);

  return (
    <Container
      {...inputProps}
      onKeyDown={handleKeyDown}
      value={inputValue}
      onChange={setInputValue}
      state={getInputState({ disabled, hasError })}
      disabled={disabled}
      hasError={hasError}
      onClear={handleClear}
      clearIconPlacement={clearIconPlacement === 'right' ? 'left' : 'right'}
      isClearIconShown={isClearIconShown}
    >
      <Tags onChange={onChange} value={value} />
    </Container>
  );
}

TagInput.propTypes = {
  ...TextInput.propTypes,
  value: PropTypes.arrayOf(PropTypes.string),
};

TagInput.defaultProps = {
  ...TextInput.defaultProps,
  value: [],
};

export default TagInput;
