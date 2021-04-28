export const addNullValue = (_enum: Record<string, unknown>): (null | string)[] => {
  const values: (null | string)[] = [null];
  Object.keys(_enum).forEach(key => {
    values.push(key);
  });

  return values;
};
