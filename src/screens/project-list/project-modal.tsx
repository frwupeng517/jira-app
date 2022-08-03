import { Button, Drawer } from "antd";
import React from "react";

export const ProjectModal = (props: {
  projectModalVisible: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      width="100%"
      visible={props.projectModalVisible}
      onClose={props.onClose}
    >
      <h1>Project Modal</h1>
    </Drawer>
  );
};
