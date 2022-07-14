import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";

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

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log("evt", evt);
    const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    register({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名：</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码：</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">注册</button>
    </form>
  );
};

export default RegisterScreen;