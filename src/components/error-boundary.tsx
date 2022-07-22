import React from "react";

// TODO: 错误边界处理社区方案：https://github.com/bvaughn/react-error-boundary

// 异常发生时，渲染备用的方案（页面）
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// React.Component 通常接收两个参数，P 代表 props，S 代表 state
// export class ErrorBoundary extends React.Component<{children: ReactNode, fallbackRender: FallbackRender}, any> {}

// React.PropsWithChildren 这个工具类用于返回带了 children 的 props，其签名如下：
// type PropsWithChildren<P = unknown> = P & { children?: ReactNode | undefined };、
// 使用这个工具类可以不用再单独把 children 解构出来了
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  // 当子组件抛出异常，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, fallbackRender } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
