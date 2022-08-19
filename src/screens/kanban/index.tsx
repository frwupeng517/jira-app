import styled from "@emotion/styled";
import { ScreenContainer } from "components/lib";
import React from "react";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-pannel";
import { useKanbanSearchParams, useProjectInUrl } from "./util";

const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </ColumnContainer>
    </ScreenContainer>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  flex: 1;
  /* overflow-x: scroll; */
`;

export default KanbanScreen;
