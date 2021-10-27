/**
 * 包含n个用来创建action的工厂函数
 */
import { INCREMENT, DECREMENT } from "./action-types";

// 同步action：返回的是对象
export const increment = (number) => ({ type: INCREMENT, data: number });

// 同步action：返回的是对象
export const decrement = (number) => ({ type: DECREMENT, data: number });

/**
 * 异步增加的action：返回的是函数 
 */
export const incrmentAsync = (number) => {
    return (dispatch) => {
        // 执行异步代码
        setTimeout(() => {
            // 当前异步执行完成时，分发一个同步action
            dispatch(increment(number));
        }, 1000);
    }
};