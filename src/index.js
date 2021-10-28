import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./redux/store";
// import storageUtils from "./utils/storageUtils.js";
// import memoryUtils from "./utils/memoryUtils.js";

// 从本地获取用户信息，保存到内存中，此段代码可以保证浏览器关闭或重启后维持登录状态
// memoryUtils.user = storageUtils.getUser();

ReactDom.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.querySelector("#root"));