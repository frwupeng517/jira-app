import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import KanbanScreen from "screens/kanban";
import EpicScreen from "screens/epic";
import styled from "@emotion/styled";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu
          mode="inline"
          selectedKeys={[routeType]}
          items={[
            { label: <Link to="kanban">看板</Link>, key: "kanban" },
            { label: <Link to="epic">任务组</Link>, key: "task" },
          ]}
        />
      </Aside>
      <Main>
        <Routes>
          {/* projects/:projectId/kanban */}
          <Route path="/kanban" element={<KanbanScreen />} />
          {/* projects/:projectId/epic */}
          <Route path="/epic" element={<EpicScreen />} />
          <Route
            path="*"
            element={
              <Navigate to={window.location.pathname + "/kanban"} replace />
            }
          />
        </Routes>
      </Main>
    </Container>
  );
};

const Aside = styled.aside`
  display: flex;
  background-color: rgb(244, 245, 247);
`;
const Main = styled.div`
  display: flex;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  overflow: hidden;
`;

/*
路由的栈结构：
['projects', 'projects/6', window.location.pathname + '/kanban']

上面通过 Navigate 指定的默认路由，如果不指定 replace 属性，点击浏览器回退按钮时就无法返回，始终停留在看板页面
原因就是直接回退到 projects/6 时会触发 window.location.pathname + '/kanban' 这个路由，就算再点返回也会持续跳转
*/

export default ProjectScreen;
