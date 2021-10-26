// 这个模块封装了axios用以进行异步请求
import axios from "axios";
import { message } from "antd";


/**
 * 封装axios请求，可以通过传入参数控制请求类型
 * @param {String} url    请求地址
 * @param {Object} data   传输数据 默认{}
 * @param {String} method 请求类型 默认 "GET"
 * @return {Object} 返回一个promise对象
 */
export default function ajax(url, data = {}, method = "GET") {
    return new Promise((resolve, reject) => {
        let promise;
        // 执行异步ajax请求
        if (method === "GET") {
            // 发送get类型的请求
            promise = axios.get(url, { params: data });
        } else if (method === "POST") {
            // 发送post类型的请求
            promise = axios.post(url, data);
        }

        // 请求成功了,调用resolve(value)，传入数据
        // 请求失败了,不调用reject(reason)，而是提示异常信息
        promise.then(response => {
            resolve(response.data);
        }).catch(error => {
            message.error("请求出错" + error.message);
            console.log(error);
        });
    });
}