import React from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Row, Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectModal, useProjectSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox } from "components/lib";
// import { Test } from "./test";
// import { Helmet } from "react-helmet";

const ProjectListScreen = () => {
  // const [, setParam] = useState({
  //   name: "",
  //   personId: "",
  // });
  // 基本类型，可以放到依赖里；组件状态，也可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
  // 如果组件状态是一个对象 obj，只有在显示的调用了 setObj 以后，react才会任务组件状态发生了变化
  // const [param] = useUrlQueryParam(["name", "personId"]);

  // 这里为了配合useUrlQueryParam把传入的keys对象改成组件状态的对象
  // const [keys] = useState(["name", "personId"]);
  // 如果像上面这样直接把keys的初始值设成string[]，那param的类型就变成了 {[x: string]: string}，必须显示的指定具体的类型才能避免传入的值变成 string
  // const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  const [param, setSearchParams] = useProjectSearchParams();
  const { data: list, error, isLoading } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  const { open } = useProjectModal();
  // console.log("useUrlQueryParam", useUrlQueryParam(["name"]));
  useDocumentTitle("项目列表");

  return (
    <Container>
      {/* <Helmet>
        <title>项目列表</title>
      </Helmet> */}
      {/* <Test /> */}
      <Row justify="space-between" align="middle">
        <h1>项目列表</h1>
        <ButtonNoPadding type="link" onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel
        param={param}
        setParam={setSearchParams}
        users={users || []}
      />
      <ErrorBox error={error} />
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  );
};

export default ProjectListScreen;

ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
  width: 100%;
`;
