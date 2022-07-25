import { Button } from "antd";
import React, { useEffect, useState } from "react";

const test = () => {
  let num = 0;

  const effect = () => {
    num += 1;
    const message = `现在的 null 值：${num}`;
    return function unmount() {
      console.log("message", message);
    };
  };
  return effect;
};

// 执行 test，返回 effect 函数
const add = test();
// 执行 effect 函数，返回引用了 message1（num = 1）的unmount函数
const unmount = add();
// 再一次执行 effect 函数，返回引用了 message2（num = 1）的unmount函数
add();
// message3（num = 1）
add();
// message4（num = 1）
add();
// message5（num = 1）
add();
// 这里会打印什么呢？从直觉上看似乎应该是5，实际上打印了1
unmount();

export const Test = () => {
  const [num, setNum] = useState(0);
  const add = () => {
    setNum(num + 1);
  };
  useEffect(() => {
    return () => {
      console.log("num", num);
    };
  }, []);
  return (
    <>
      <Button onClick={add}>add</Button>
      <p>{num}</p>
    </>
  );
};
