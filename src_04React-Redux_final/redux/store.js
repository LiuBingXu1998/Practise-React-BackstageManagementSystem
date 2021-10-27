import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";  // 用来实现redux异步的redux中间件
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from "./reducer";

/**
 * redux最核心的管理对象:store
 */
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));