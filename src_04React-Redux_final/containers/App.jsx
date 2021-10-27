import { connect } from "react-redux";

import Counter from "../components/Counter";
import { increment, decrement, incrmentAsync } from "../redux/actions";

/**
 * 容器组件：通过connect包装UI组件产生的组件
 * connect() 高阶函数
 * connect() 返回的函数是一个高阶组件：接收一个UI组件，生成一个容器组件
 * 容器组件的责任是：向UI组件传入特定的属性
 */

// 用来将redux管理的state数据 映射成 UI组件的一般属性的函数
// function mapStateToProps(state) {
//     return {
//         count: state.count,
//     }
// }

// 用来将包含dispatch代码的函数 映射成 UI组件的函数属性的函数
// function mapDispatchToProps(dispatch) {
//     return {
//         increment: (number) => dispatch(increment(number)),
//         decrement: (number) => dispatch(decrement(number)),
//     }
// }

export default connect(
    // 指定一般属性
    state => ({ count: state.count }),
    // 指定函数属性（上面代码的简写）
    {
        increment,
        decrement,
        incrmentAsync,
    }
)(Counter);