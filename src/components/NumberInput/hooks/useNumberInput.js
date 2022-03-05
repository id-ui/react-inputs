import { useEffect, useState } from 'react';
import {
  numberToFormattedString,
  round,
  stringToFormattedNumber,
  maxMin,
} from '../helpers';

export default ({
  onChange,
  countOfDigitsAfterPoint,
  thousandsSeparator,
  onlyValue,
  value: providedValue,
  max,
  min,
}) => {
  const [value, setValue] = useState(() =>
    numberToFormattedString(
      maxMin(providedValue, max, min),
      thousandsSeparator,
      countOfDigitsAfterPoint
    )
  );

  useEffect(() => {
    if (
      `${round(providedValue, countOfDigitsAfterPoint)}` !==
      stringToFormattedNumber(value, thousandsSeparator)
    ) {
      setValue(
        numberToFormattedString(
          maxMin(providedValue, max, min),
          thousandsSeparator,
          countOfDigitsAfterPoint
        )
      );
    }
  }, [
    providedValue,
    value,
    thousandsSeparator,
    countOfDigitsAfterPoint,
    max,
    min,
  ]);

  const handleChange = (e) => {
    e.persist();
    const { selectionStart, value: inputValue } = e.target;

    const newValue = maxMin(
      inputValue.replace(/\D/g, '').replace(/^0+/, ''),
      max,
      min
    );
    const newInputValue = numberToFormattedString(
      newValue,
      thousandsSeparator,
      countOfDigitsAfterPoint
    );

    setValue(newInputValue);

    if (onlyValue) {
      onChange(newValue || '');
    } else {
      e.target.value = newValue;
      onChange(e);
    }

    setTimeout(() => {
      const newSelectionStart =
          selectionStart + (newInputValue.length - inputValue.length);
      e.target.setSelectionRange(newSelectionStart, newSelectionStart);
    }, 0)
  };

  const handleKeyDown = (e) => {
    const { keyCode } = e;

    if (!thousandsSeparator || ![37, 39, 8, 46].includes(keyCode)) {
      return;
    }

    const { value: inputValue } = e.target;
    let { selectionStart, selectionEnd } = e.target;

    const isForward = [39, 46].includes(keyCode);

    if (
      selectionEnd - selectionStart === 0 &&
      !thousandsSeparator.includes(
        inputValue[isForward ? selectionStart : selectionStart - 1]
      )
    ) {
      return;
    }

    e.preventDefault();
    e.persist();

    const shouldCaptureAdditionalSymbols = selectionEnd - selectionStart === 0;

    if (shouldCaptureAdditionalSymbols) {
      if (isForward) {
        if (keyCode === 46) {
          selectionEnd++;
          while (thousandsSeparator.includes(inputValue[selectionEnd - 1])) {
            selectionEnd++;
          }
        } else {
          selectionStart++;
          while (thousandsSeparator.includes(inputValue[selectionStart - 1])) {
            selectionStart++;
          }
        }
      } else {
        selectionStart--;
        while (thousandsSeparator.includes(inputValue[selectionStart])) {
          selectionStart--;
        }
      }
    }

    // Backspace, Delete
    if ([8, 46].includes(keyCode)) {
      const inputValueArray = [...e.target.value];

      inputValueArray.splice(selectionStart, selectionEnd - selectionStart);

      const newInputValue = inputValueArray.filter(
        (item) => !thousandsSeparator.includes(item)
      ).join``.replace(/^0+/, '');

      const newDisplayedValue = numberToFormattedString(
        newInputValue,
        thousandsSeparator,
        countOfDigitsAfterPoint
      );

      setValue(newDisplayedValue);

      if (onlyValue) {
        onChange(newInputValue ? parseFloat(newInputValue) : '');
      } else {
        e.target.value = newInputValue;
        onChange(e);
      }

      if (!shouldCaptureAdditionalSymbols) {
        selectionStart = numberToFormattedString(
          [...inputValue.substring(0, selectionStart)].filter(
            (item) => !thousandsSeparator.includes(item)
          ).join``
        ).length;
      }
    }

    setTimeout(() => {
      e.target.setSelectionRange(selectionStart, selectionStart);
    }, 0)
  };

  return {
    value,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
  };
};
