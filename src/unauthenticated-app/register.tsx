import { Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import React from "react";
import { LongButton } from "unauthenticated-app";

// const apiUrl = process.env.REACT_APP_API_URL;

const RegisterScreen = () => {
  // const login = (param: { username: string, password: string}) => {
  //   fetch(`${apiUrl}/register`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(param),
  //   }).then(async (res: Response) => {
  //     if (res.ok) {}
  //   })
  // }

  const { register } = useAuth();

  const handleSubmit = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    // evt.preventDefault();
    // console.log("evt", evt);
    // const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
    // const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    register({ username, password });
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType="submit">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;
