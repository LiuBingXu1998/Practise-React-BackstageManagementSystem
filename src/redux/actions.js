/**
 * 包含n个action creator函数的模块
 * 同步action： 对象 {tyoe: "xxx", data:  }
 * 异步action：函数 (dispatch) => {}
 */
import {
    SET_HEAD_TITLE,
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    RESET_USER,
} from "./actions-type";
import { message } from "antd";

import { reqLogin } from "../api/index";
import storageUtils from "../utils/storageUtils";

// 设置头部标题的同步action
export const setHeadTitle = (headTitle) => ({ type: SET_HEAD_TITLE, data: headTitle });

// 接收用户的同步action
export const receiverUser = (user) => ({ type: RECEIVE_USER, user });

// 显示错误信息的同步action
export const showErrorMsg = (errorMsg) => ({ type: SHOW_ERROR_MSG, errorMsg });

//退出登录的同步action
export const logout = () => {
    // 删除local中的user
    storageUtils.removeUser();
    // 返回action对象
    return { type: RESET_USER }
}

// 登陆的异步action
export const login = (username, password) => {
    return async (dispatch) => {
        // 执行异步ajax请求
        const result = await reqLogin(username, password);
        // 如果成功，分发成功的同步action
        if (result.status === 0) {
            message.success("登录成功！你好" + result.data.username + "!");
            const user = result.data;
            storageUtils.saveUser(user);  // 将用户保存到本地
            dispatch(receiverUser(user));
        } else {
            // 如果失败，分发失败的同步action
            const msg = result.msg;
            dispatch(showErrorMsg(msg));
        }
    };
};