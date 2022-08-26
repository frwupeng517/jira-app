import styled from "@emotion/styled";
import { Spin } from "antd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
import { ScreenContainer } from "components/lib";
import React, { useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDocumentTitle } from "utils";
import { useKanbans, useReorderKanban } from "utils/kanban";
import { useReorderTask, useTasks } from "utils/task";
import { CreateKanban } from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-pannel";
import { TaskModal } from "./task-modal";
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./util";

const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = kanbanIsLoading || taskIsLoading;
  const onDragEnd = useDropEnd(); // 用于拖拽后持久化
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        <Spin spinning={!!isLoading}>
          <ColumnContainer>
            <Drop type="column" direction="horizontal" droppableId="kanban">
              <DropChild style={{ display: "flex" }}>
                {kanbans?.map((kanban, index) => (
                  <Drag
                    key={kanban.id}
                    draggableId={`kanban${kanban.id}`}
                    index={index}
                  >
                    <KanbanColumn kanban={kanban} key={kanban.id} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumnContainer>
        </Spin>
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

export const useDropEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  const { data: tasks } = useTasks(useTasksSearchParams());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      console.log("source", source);
      console.log("destination", destination);
      console.log("type", type);
      if (!destination) return;
      // 拖拽看板
      if (type === "column") {
        const fromId = kanbans?.[source.index]?.id;
        const toId = kanbans?.[destination.index]?.id;
        if (!fromId || !toId || fromId === toId) return;
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, referenceId: toId, type });
      }
      // 拖拽任务
      if (type === "row") {
        const { droppableId: fromKanbanId } = source;
        const { droppableId: toKanbanId } = destination;
        // if (fromKanbanId !== toKanbanId) return; // 不允许跨看板拖拽
        console.log("tasks", tasks);
        console.log("fromKanbanId", fromKanbanId);
        console.log("toKanbanId", toKanbanId);
        const fromTask = tasks?.filter(
          (task) => task.kanbanId === Number(fromKanbanId)
        )[source.index];
        const toTask = tasks?.filter(
          (task) => task.kanbanId === Number(toKanbanId)
        )[destination.index];
        console.log("fromTask", fromTask);
        console.log("toTask", toTask);
        if (fromTask?.id === toTask?.id) return;
        console.log("1");
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId: Number(fromKanbanId),
          toKanbanId: Number(toKanbanId),
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [kanbans, tasks, reorderKanban, reorderTask]
  );
};

export const ColumnContainer = styled("div")`
  display: flex;
  flex: 1;
  overflow-x: scroll;
`;

export default KanbanScreen;
