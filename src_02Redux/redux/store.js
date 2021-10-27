import { createStore } from 'redux';

import reducer from "./reducer";

/**
 * redux最核心的管理对象:store
 */
export default createStore(reducer);