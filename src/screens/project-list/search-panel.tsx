/* @jsxImportSource @emotion/react */ // 在组件的顶部写这行代码，告知当前组件用了 emotion 行内样式
import React from "react";
import { Form, Input } from "antd";
import { UserSelect } from "components/user-select";
import { Project } from "types/project";
import { User } from "types/user";

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
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
        <UserSelect
          value={param.personId}
          defaultOptionName="负责人"
          onChange={(value) => setParam({ ...param, personId: value })}
        />
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
