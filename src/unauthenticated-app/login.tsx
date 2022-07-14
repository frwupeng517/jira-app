import { Button, Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import React from "react";

// const apiUrl = process.env.REACT_APP_API_URL;

const LoginScreen = () => {
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

  const { login } = useAuth();

  const handleSubmit = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    // evt.preventDefault();
    // const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
    // const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginScreen;
