import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { Link } from "react-router-dom";
import KanbanScreen from "screens/kanban";
import EpicScreen from "screens/epic";

const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to="kanban">看板</Link>
      <Link to="epic">任务组</Link>
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
    </div>
  );
};

/*
路由的栈结构：
['projects', 'projects/6', window.location.pathname + '/kanban']

上面通过 Navigate 指定的默认路由，如果不指定 replace 属性，点击浏览器回退按钮时就无法返回，始终停留在看板页面
原因就是直接回退到 projects/6 时会触发 window.location.pathname + '/kanban' 这个路由，就算再点返回也会持续跳转
*/

export default ProjectScreen;
