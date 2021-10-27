import React from "react";
import ReactDom from "react-dom";

import App from "./App";
import store from "./redux/store"

ReactDom.render(<App store={store} />, document.querySelector("#root"));

// 给store状态更新的事件回调
store.subscribe(() => {
    // 重新渲染App组件标签
    ReactDom.render(<App store={store} />, document.querySelector("#root"));
});