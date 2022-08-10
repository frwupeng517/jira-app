import { Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListActions,
  selectProjectModalVisible,
} from "./project-list.slice";

export const ProjectModal = () => {
  const dispatch = useDispatch();
  const projectModalVisible = useSelector(selectProjectModalVisible);
  return (
    <Drawer
      width="100%"
      visible={projectModalVisible}
      onClose={() => dispatch(projectListActions.closeProjectModal())}
    >
      <h1>Project Modal</h1>
    </Drawer>
  );
};
