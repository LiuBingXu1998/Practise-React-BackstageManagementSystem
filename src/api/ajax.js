// 这个模块封装了axios用以进行异步请求
import axios from "axios";

/**
 * 封装axios请求，可以通过传入参数控制请求类型
 * @param {String} url    请求地址
 * @param {Object} data   传输数据 默认{}
 * @param {String} method 请求类型 默认 "GET"
 * @return {Object} 返回一个promise对象
 */
export default function ajax(url, data = {}, method = "GET") {
    if (method === "GET") {
        // 发送get类型的请求
        return axios.get(url, { params: data });
    } else if (method === "POST") {
        // 发送post类型的请求
        return axios.post(url, data);
    }
}