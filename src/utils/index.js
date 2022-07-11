import { useState, useEffect } from "react";

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

/*
const debounce = (func, delay) => {
  let timeout;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(func, delay)
  }
}
const log = debounce(() => console.log('ddd'), 3000);
log();
log();
log();
*/

// 只要value发生变化，就会执行 useEffect 并清除定时器内容，只有在停止输入的delay时间段后才会返回预期的value
export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    // 每次在 value 变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    // 清除 effect执行的时机
    // （1）、每次在上一个 useEffect 处理完以后再运行
    // （2）、组件卸载之前
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};

export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};
