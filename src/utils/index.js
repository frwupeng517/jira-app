// 排除 0 以外的空值
export const isFalsy = (value) => (value === 0 ? false : !value);

// 排除对象中值为空的属性
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
