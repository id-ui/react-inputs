export default (element, name) => {
  if ('createEvent' in document) {
    const event = document.createEvent('HTMLEvents');
    event.initEvent(name, false, true);
    element.dispatchEvent(event);
  } else {
    element.fireEvent(`on${name}`);
  }
};
