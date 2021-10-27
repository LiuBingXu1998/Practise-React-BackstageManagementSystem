import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { increment, decrement } from "./redux/actions";

export default class App extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);

        this.numberRef = React.createRef();
    }

    increment = () => {
        const number = parseInt(this.numberRef.current.value);
        this.props.store.dispatch(increment(number));
    }

    decrement = () => {
        const number = parseInt(this.numberRef.current.value);
        this.props.store.dispatch(decrement(number));
    }

    incrmentIfOdd = () => {
        if (this.props.store.getState() % 2 === 1) {
            const number = parseInt(this.numberRef.current.value);
            this.props.store.dispatch(increment(number));
        }
    }

    incrmentAsync = () => {
        setTimeout(() => {
            const number = parseInt(this.numberRef.current.value);
            this.props.store.dispatch(increment(number));;
        }, 1000);
    }

    render() {
        // 状态数据
        // 点击次数
        const count = this.props.store.getState();

        return (
            <div>
                <div>点击了{count}次</div>
                <div>
                    <select ref={this.numberRef}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>&nbsp;&nbsp;

                    <button onClick={this.increment}>+</button>&nbsp;&nbsp;
                    <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
                    <button onClick={this.incrmentIfOdd}>奇数+</button>&nbsp;&nbsp;
                    <button onClick={this.incrmentAsync}>异步+</button>&nbsp;&nbsp;
                </div>
            </div>
        )
    }
}
