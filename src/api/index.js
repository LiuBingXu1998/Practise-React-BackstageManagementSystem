// 这个模块封装了项目用到的所有AJAX请求
import ajax from "./ajax";
import jsonp from "jsonp";
import { message } from "antd";

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
 * @returns 返回Promise对象
 */
export const reqAddUser = (user) => ajax(BASE + "/manage/user/add", user, "POST");

/**
 * 请求分类列表
 * @param {String} parentId 父对象ID
 * @returns 返回Promise对象
 */
export const reqGetCategorys = (parentId) => ajax(BASE + "/manage/category/list", { parentId });

/**
 * 添加分类
 * @param {String} parentId     父对象ID
 * @param {String} categoryName 分类名称
 * @returns 返回Promise对象
 */
export const reqAddCategory = (parentId, categoryName) => ajax(BASE + "/manage/category/add", { parentId, categoryName }, "POST");

/**
 * 更新品类名称
 * @param {String} categoryId   父对象ID
 * @param {String} categoryName 品类名称
 * @returns 返回Promise对象
 */
export const reqUpdateCategory = (categoryId, categoryName) => ajax(BASE + "/manage/category/update", { categoryId, categoryName }, "POST");

/**
 * 根据分类ID获取对应的分类对象
 * @param {String} categoryId 分类ID
 * @returns 返回Promise对象
 */
export const reqCategory = (categoryId) => ajax(BASE + "/manage/category/info", { categoryId });

/**
 * 获取商品分页列表
 * @param {Number} pageNum  页码
 * @param {Number} pageSize 每页数据数量
 * @returns 返回Promise对象
 */
export const reqProducts = (pageNum, pageSize) => ajax(BASE + "/manage/product/list", { pageNum, pageSize });

/**
 * 搜索产品分页列表
 * @param {Number} pageNum     页码
 * @param {Number} pageSize    每页数据数量
 * @param {String} searchName  搜索的关键字
 * @param {String} searchType  搜索类型(限制搜索类型为:productName/productDesc)
 * @returns 返回Promise对象
 */
export const reqSearchProducts = (pageNum, pageSize, searchName, searchType) => {
    // 对传入的参数进行封装对象处理
    const obj = {
        pageNum,
        pageSize,
        [searchType]: searchName,
    }
    // 发送ajax请求
    return ajax(BASE + "/manage/product/search", obj);
};

/**
 * 更新商品状态(上架/下架)
 * @param {*} productId 商品Id
 * @param {*} status    商品状态 (1在售 / 2已下架)
 * @returns 返回Promise对象
 */
export const reqUpdateStatus = (productId, status) => ajax(BASE + "/manage/product/updateStatus", { productId, status }, "POST");

/**
 * 删除图片请求
 * @param {string} name 图片名称
 * @returns 返回Promise对象
 */
export const reqDeleteImg = (name) => ajax(BASE + "/manage/img/delete", { name }, "POST");

/**
 * 添加商品/修改商品
 * @param {Object} product 商品对象
 * @returns 返回Promise对象
 */
export const reqAddOrUpdateProduct = (product) => {
    const URL = product._id ? "update" : "add";
    return ajax(BASE + "/manage/product/" + URL, product, "POST");
}

/**
 * 请求天气信息
 * @param {Number} cityCode 城市代码
 * @returns 返回Promise对象
 */
export const reqWeather = (cityCode = 320900) => {
    return new Promise((resolve, reject) => {
        // 准备url
        const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=e0127f55b9ce6cce676491ccaf142b19&city=${cityCode}&extensions=base`;
        // 发送jsonp请求
        jsonp(url, {}, (err, data) => {
            // 请求成功
            if (!err) {
                if (data.info === "OK") {
                    const { weather, city } = data.lives[0];
                    resolve({ weather, city });
                } else {
                    message.error("获取天气数据失败！");
                    console.log(data);
                }
            } else {
                // 请求失败,打印输出
                console.log(err);
            }
        });
    })
}