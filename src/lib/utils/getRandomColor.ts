export const getRandomColor = () => {
  const classes = ["primary", "font", "green-light"];
  const randomIndex = Math.floor(Math.random() * classes.length);
  return classes[randomIndex];
};
