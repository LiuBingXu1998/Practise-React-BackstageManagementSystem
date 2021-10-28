/**
 * 根据老的state和指定的action生成并返回新的state
 */
import { combineReducers } from "redux";

import storageUtils from "../utils/storageUtils";
import {
    SET_HEAD_TITLE,
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    RESET_USER,
} from "./actions-type";

// 用来管理头部标题的reducer函数
function headTitle(state = "首页", action) {
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data;
        default:
            return state;
    }
}

// 用来管理当前登录用户
const initUser = storageUtils.getUser();
function user(state = initUser, action) {
    switch (action.type) {
        case SHOW_ERROR_MSG:
            const errorMsg = action.errorMsg;
            return { ...state, errorMsg };
        case RECEIVE_USER:
            return action.user;
        case RESET_USER:
            return {};
        default:
            return state;
    }
}

// 向外默认暴露的是合并产生的总的reducer
export default combineReducers({
    headTitle,
    user
});