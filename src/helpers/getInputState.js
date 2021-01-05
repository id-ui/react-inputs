export default ({ disabled, hasError }) => {
  if (disabled) {
    return 'disabled';
  } else if (hasError) {
    return 'error';
  }
  return 'default';
};
