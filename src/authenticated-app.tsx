import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { Route, Routes, Navigate } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "context/auth-context";
import ProjectListScreen from "screens/project-list";
import ProjectScreen from "screens/project";
import { ReactComponent as SoftwareLogo } from "assets/jira.svg";
import { Button, Dropdown, Menu } from "antd";
import { resetRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "components/project-popover";

/**
 * grid 和 flex 各自的应用场景
 * 1、考虑是一维布局还是二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 *
 * 2、是从内容出发还是从布局出发
 * 从内容出发：先有一组内容（数量一般不固定），然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格（数量一般比较固定），然后再把元素往里填充
 * 从内容出发用 flex，从布局出发用 grid
 */
const AuthenticatedApp = () => {
  return (
    <Container>
      <Router>
        <PageHeader />
        <Main>
          <Routes>
            <Route path="/projects" element={<ProjectListScreen />} />
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
            <Route path="*" element={<Navigate to="/projects" replace />} />
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header between>
      <HeaderLeft gap>
        <ButtonNoPadding
          type="link"
          onClick={resetRoute}
          style={{ height: "100%" }}
        >
          <SoftwareLogo
          // width="18rem"
          // color="rgb(38, 132, 255)"
          />
        </ButtonNoPadding>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

export default AuthenticatedApp;

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu
          items={[
            {
              key: "logout",
              label: (
                <Button type="link" onClick={logout}>
                  登出
                </Button>
              ),
            },
          ]}
        />
      }
    >
      <Button type="link" onClick={(evt) => evt.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
// grid-area 属性指定网格元素在网格布局中的大小和位置，也可以对网格元素进行命名
// 命名的网格元素可以通过容器的 grid-template-areas 属性来引用
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
