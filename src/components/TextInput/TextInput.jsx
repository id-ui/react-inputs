import React, { useCallback, useMemo, useRef } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import MaskInput from '@idui/react-mask-input';
import Icon from '@idui/react-icon';
import dispatchEvent from 'helpers/dispatchEvent';
import getInputState from 'helpers/getInputState';
import { colors as defaultColors } from 'theme';
import { Container, Control, AddonsWrapper, Addon } from './styled';
import { TYPES } from './constants';

function TextInput(
  {
    value,
    onChange,
    onlyValue: providedOnlyValue,
    mask,
    disabled,
    hasError,
    isClearable,
    onClear,
    leftAddon,
    rightAddon,
    className,
    children,
    clearIconPlacement,
    isClearIconShown,
    colors: customColors,
    maxlength,
    ...inputProps
  },
  ref
) {
  let inputRef = useRef();

  if (ref) {
    inputRef = ref;
  }

  const onlyValue = useMemo(() => providedOnlyValue || Boolean(mask), [
    providedOnlyValue,
    mask,
  ]);

  const handleChange = useCallback(
    (e) => {
      let newValue = mask ? e : e.target.value;
      if (maxlength) {
        newValue = newValue.substring(0, maxlength);
      }
      if (onlyValue) {
        onChange(newValue);
      } else {
        e.target.value = newValue;
        onChange(e);
      }
    },
    [mask, onlyValue, onChange, maxlength]
  );

  const handleClear = useCallback(
    (e) => {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      if (onClear) {
        return onClear();
      }

      if (onlyValue) {
        onChange('');
      } else {
        inputRef.current.value = '';
        dispatchEvent(inputRef.current, 'change');
      }

      inputRef.current.focus();
    },
    [onlyValue, onClear, onChange]
  );

  const showClearIndicator =
    !disabled && isClearable && isClearIconShown(value);

  const colors = { ...defaultColors, ...customColors };

  const clearIcon = showClearIndicator && (
    <Addon>
      <Icon
        name="cross"
        color={colors.default.border}
        hoverColor={colors.focused.border}
        cursor="pointer"
        size="12px"
        onClick={handleClear}
      />
    </Addon>
  );

  const ControlComponent = mask ? MaskInput : 'input';

  return (
    <Container
      className={className}
      state={getInputState({ hasError, disabled })}
      withRightAddon={showClearIndicator || Boolean(rightAddon)}
      withLeftAddon={Boolean(leftAddon)}
      colors={colors}
    >
      <AddonsWrapper>
        {clearIconPlacement === 'left' && clearIcon}
        {leftAddon && <Addon>{leftAddon}</Addon>}
      </AddonsWrapper>
      <Control
        as={ControlComponent}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        mask={mask}
        ref={inputRef}
        {...inputProps}
      />
      {children}
      <AddonsWrapper>
        {clearIconPlacement === 'right' && clearIcon}
        {rightAddon && <Addon>{rightAddon}</Addon>}
      </AddonsWrapper>
    </Container>
  );
}

const TextInputWithRef = React.forwardRef(TextInput);

const colorSetShape = PropTypes.shape({
  border: PropTypes.string,
  color: PropTypes.string,
  background: PropTypes.string,
  placeholder: PropTypes.string,
  tag: PropTypes.string,
});

TextInputWithRef.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  type: PropTypes.oneOf(Object.keys(TYPES)),
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  hasError: PropTypes.bool,
  onlyValue: PropTypes.bool,
  isClearable: PropTypes.bool,
  isClearIconShown: PropTypes.func,
  clearIconPlacement: PropTypes.oneOf(['right', 'left']),
  mask: PropTypes.string,
  maskPlaceholder: PropTypes.string,
  leftAddon: PropTypes.any,
  rightAddon: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.any,
  colors: PropTypes.shape({
    default: colorSetShape,
    disabled: colorSetShape,
    error: colorSetShape,
    focused: colorSetShape,
  }),
  maxlength: PropTypes.number,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  autoComplete: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

TextInputWithRef.defaultProps = {
  onChange: _.noop,
  onlyValue: true,
  type: 'text',
  isClearable: true,
  clearIconPlacement: 'right',
  isClearIconShown: (value) => Boolean(value),
  colors: defaultColors,
};

export default TextInputWithRef;
