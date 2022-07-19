import { Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import React from "react";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async ({
    username,
    password,
    cpassword,
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (password !== cpassword) {
      onError(new Error("请确认两次输入的密码是否相同！"));
      return;
    }
    try {
      await run(register({ username, password }));
    } catch (error) {
      onError(error as Error);
    }
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
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "请输入确认密码" }]}
      >
        <Input.Password placeholder="确认密码" />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType="submit" loading={isLoading}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;
