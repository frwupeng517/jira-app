/* @jsxImportSource @emotion/react */ // 在组件的顶部写这行代码，告知当前组件用了 emotion 行内样式
import React from "react";
import { Form, Input, Select } from "antd";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}

const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form layout="inline" css={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          onChange={(evt) => setParam({ ...param, name: evt.target.value })}
          placeholder="项目名"
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        >
          <Select.Option value={""}>负责人</Select.Option>
          {Array.isArray(users) &&
            users.map((item) => (
              <Select.Option value={item.id} key={item.id}>
                {item.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
