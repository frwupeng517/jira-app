import styled from "@emotion/styled";
import { useAuth } from "context/auth-context";
import ProjectListScreen from "screens/project-list";

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
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <button onClick={logout}>登出</button>
      </Header>
      <Nav>nav</Nav>
      <Main>
        <ProjectListScreen />
      </Main>
      <Aside>aside</Aside>
      <Footer>footer</Footer>
    </Container>
  );
};

export default AuthenticatedApp;

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas: "header header header" "nav main aside" "footer footer footer";
  grid-gap: 10rem;
  height: 100vh;
`;
// grid-area 属性指定网格元素在网格布局中的大小和位置，也可以对网格元素进行命名
// 命名的网格元素可以通过容器的 grid-template-areas 属性来引用
const Header = styled.header`
  grid-area: header;
`;
const Main = styled.main`
  grid-area: main;
`;
const Nav = styled.nav`
  grid-area: nav;
`;
const Aside = styled.aside`
  grid-area: aside;
`;
const Footer = styled.footer`
  grid-area: footer;
`;
