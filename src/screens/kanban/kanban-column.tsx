import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useKanbansQueryKey, useTaskModal, useTasksSearchParams } from "./util";
import bugIcon from "assets/ladybug.svg";
import taskIcon from "assets/task1.svg";
import { useTaskTypes } from "utils/task-type";
import styled from "@emotion/styled";
import { Card, Menu, Modal, Button, Dropdown } from "antd";
import { CreateTask } from "./create-task";
import { Task } from "types/task";
import { Mark } from "components/mark";
import { useDeleteKanban } from "utils/kanban";
import { Row } from "components/lib";
import React from "react";
import { Drag, Drop, DropChild } from "components/drag-and-drop";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) return null;
  return <img src={name === "task" ? taskIcon : bugIcon} alt="img" />;
};

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTaskModal();
  const { name: keyword } = useTasksSearchParams();
  return (
    <Card
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      onClick={() => startEdit(task.id)}
    >
      {/* <div>{task.name}</div> */}
      <p>
        <Mark keyword={keyword} name={task.name} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

export const KanbanColumn = React.forwardRef<
  HTMLDivElement,
  { kanban: Kanban }
>(({ kanban, ...props }, ref) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <Container {...props} ref={ref}>
      <Row between>
        <h3>{kanban.name}</h3>
        <More kanban={kanban}></More>
      </Row>
      <TasksContainer>
        <Drop type="row" direction="vertical" droppableId={String(kanban.id)}>
          {/* 指定一个最小高度，防止在看板为空时，拖拽异常 */}
          <DropChild style={{ minHeight: 5 }}>
            {tasks?.map((task, taskIndex) => (
              <Drag
                key={task.id}
                index={taskIndex}
                draggableId={`task${task.id}`}
              >
                {/* 这里使用一个原生的div标签来转发 TaskCard 自定义组件的ref，也可以在自定义 TaskCard 时用React.forwardRef 来进行转发，例如 KanbanColumn 那样实现 */}
                <div>
                  <TaskCard task={task} key={task.id} />
                </div>
              </Drag>
            ))}
          </DropChild>
        </Drop>
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  );
});

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey());
  const startDelete = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除看板吗？",
      onOk() {
        mutateAsync({ id: kanban.id });
      },
    });
  };
  const overlay = (
    <Menu
      items={[
        {
          label: (
            <Button type="link" onClick={startDelete}>
              删除
            </Button>
          ),
          key: "delete",
        },
      ]}
    />
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type="link">...</Button>
    </Dropdown>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;
const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
