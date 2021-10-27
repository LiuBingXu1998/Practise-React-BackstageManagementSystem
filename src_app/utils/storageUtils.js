/**
 * 这个模块能够将信息存储在本地
 */
import store from "store";

const USER_KEY = "user_key";

const storageUtils = {
    /**
     * 保存本地用户信息
     * @param {Object} user 
     */
    saveUser(user) {
        store.set(USER_KEY, user);
    },
    /**
     * 读取本地用户信息
     */
    getUser() {
        return store.get(USER_KEY) || {};
    },
    /**
     * 删除本地用户信息
     */
    removeUser() {
        store.remove(USER_KEY);
    }
}

export default storageUtils;