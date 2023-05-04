export const debounce = (callback, delayInMS) => {
  let timer;
  return (args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(args);
    }, delayInMS);
  };
};
