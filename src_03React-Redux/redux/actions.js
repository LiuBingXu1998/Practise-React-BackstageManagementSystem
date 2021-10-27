/**
 * 包含n个用来创建action的工厂函数
 */
import { INCREMENT, DECREMENT } from "./action-types";

export const increment = (number) => ({ type: INCREMENT, data: number });

export const decrement = (number) => ({ type: DECREMENT, data: number });