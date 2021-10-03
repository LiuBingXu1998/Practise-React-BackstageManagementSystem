// 这个模块封装了项目用到的所有AJAX请求
import ajax from "./ajax";

// 基础请求地址
const BASE = "";

/**
 * 登陆请求
 * @param {String} username 用户名
 * @param {String} password 密码
 * @return {Object} 返回Promise对象
 */
export const reqLogin = (username, password) => ajax(BASE + "/login", { username, password }, "POST");

/**
 * 添加用户请求
 * @param {Object} user 用户对象
 * @returns 
 */
export const reqAddUser = (user) => ajax(BASE + "/manage/user/add", user, "POST");