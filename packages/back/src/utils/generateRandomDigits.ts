import generateRandomNumber from './generateRandomNumber';

const generateRandomDigits = (length = 5) =>
  [...new Array(length)].reduce((accumulator) => {
    const newDigit = generateRandomNumber(0, 9);

    return `${accumulator}${newDigit}`;
  }, '');

export default generateRandomDigits;
