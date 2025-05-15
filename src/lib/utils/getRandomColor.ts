export const getRandomColor = () => {
  const classes = ["green-100", "green-200", "green-300"];
  const randomIndex = Math.floor(Math.random() * classes.length);
  return classes[randomIndex];
};
