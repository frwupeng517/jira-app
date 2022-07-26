import React from "react";

if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    // trackAllPureComponents: true, // 默认开启全局跟踪
    trackAllPureComponents: false, // 关闭全局跟踪
  });
}
