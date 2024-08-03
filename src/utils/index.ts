export const randomNumberGenerator = (start: number, end: number) =>
  Math.ceil(Math.abs(start + Math.random() * (end - start)));
