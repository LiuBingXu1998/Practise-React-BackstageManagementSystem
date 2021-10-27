import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * UI 组件，主要做显示，与用户交互
 * 代码中没有任何操作redux相关的代码
 */
export default class Counter extends Component {
    static propTypes = {
        count: PropTypes.number.isRequired,
        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.numberRef = React.createRef();
    }

    increment = () => {
        const number = parseInt(this.numberRef.current.value);
        this.props.increment(number);
    }

    decrement = () => {
        const number = parseInt(this.numberRef.current.value);
        this.props.decrement(number);
    }

    incrmentIfOdd = () => {
        if (this.props.count % 2 === 1) {
            const number = parseInt(this.numberRef.current.value);
            this.props.increment(number);
        }
    }

    incrmentAsync = () => {
        setTimeout(() => {
            const number = parseInt(this.numberRef.current.value);
            this.props.increment(number);
        }, 1000);
    }

    render() {
        // 状态数据
        // 点击次数
        const count = this.props.count;

        return (
            <div>
                <div>点击了{count}次</div>
                <div>
                    <select ref={this.numberRef}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    &nbsp;&nbsp;

                    <button onClick={this.increment}>+</button>
                    &nbsp;&nbsp;
                    <button onClick={this.decrement}>-</button>
                    &nbsp;&nbsp;
                    <button onClick={this.incrmentIfOdd}>奇数+</button>
                    &nbsp;&nbsp;
                    <button onClick={this.incrmentAsync}>异步+</button>
                    &nbsp;&nbsp;
                </div>
            </div>
        )
    }
}
