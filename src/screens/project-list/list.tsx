import { Dropdown, Menu, Table, TableProps } from "antd";
import { ButtonNoPadding } from "components/lib";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { useEditProject } from "utils/project";
import { User } from "./search-panel";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
  projectButton: JSX.Element;
}

const List = ({ users, dataSource, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checked disabled />,
          render: (_, project) => {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render: (_, record) => (
            <Link to={String(record.id)}>{record.name}</Link>
          ),
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render: (_, record) => (
            <span>
              {users.find((user) => user.id === record.personId)?.name ||
                "未知"}
            </span>
          ),
        },
        {
          title: "创建时间",
          render: (_, record) => (
            <span>
              {record.created
                ? dayjs(record.created).format("YYYY-MM-DD")
                : "无"}
            </span>
          ),
        },
        {
          render: (_, record) => {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="edit">{props.projectButton}</Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type="link">...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      dataSource={dataSource}
      rowKey="id"
      {...props}
    />
  );
};

export default List;
