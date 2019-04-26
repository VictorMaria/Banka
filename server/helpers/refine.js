const refine = (text) => {
  let refined = text.replace(/ +/g, '');
  refined = refined[0].toUpperCase() + refined.slice(1).toLowerCase();
  return refined;
};
export default refine;
