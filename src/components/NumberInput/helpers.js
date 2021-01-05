import _ from 'lodash';

export const round = (value, countOfDigitsAfterPoint) =>
  _.isNumber(countOfDigitsAfterPoint)
    ? Math.round(parseFloat(value) * 10 ** countOfDigitsAfterPoint) /
      10 ** countOfDigitsAfterPoint
    : value;

export const numberToFormattedString = (
  value,
  thousandsSeparator,
  countOfDigitsAfterPoint
) => {
  if (!value) {
    return '';
  }

  const roundedValue = round(value, countOfDigitsAfterPoint);

  const [match, wholePart, separator, integralPart] = `${roundedValue}`.match(
    /^(\d*)(\D?)(\d*)$/
  );

  const formattedWholePart = wholePart.replace(
    /(\d)(?=(?:[0-9]{3})+\b)/g,
    `$1${thousandsSeparator}`
  );

  return `${formattedWholePart}${separator}${integralPart}`;
};

export const stringToFormattedNumber = (value, thousandsSeparator) =>
  value.replace(RegExp(thousandsSeparator, 'g'), '').replace(/^0+/, '');

export const maxMin = (value, max, min) => {
  if (!value) {
    return '';
  }

  let result = parseFloat(value);

  if (min) {
    result = Math.max(result, min);
  }

  if (max) {
    result = Math.min(result, max);
  }

  return result;
};
