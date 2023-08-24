const generateRandomNumber = (min: number, max: number) => {
  const amountOfPossibilities = max - min + 1;

  const randomFrom0 = Math.floor(amountOfPossibilities * Math.random());

  return min + randomFrom0;
};

export default generateRandomNumber;
