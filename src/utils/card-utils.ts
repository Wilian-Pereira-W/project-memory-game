export const duplicateArray = <T>(array: T[]): T[] => {
  return array.concat(array);
};
