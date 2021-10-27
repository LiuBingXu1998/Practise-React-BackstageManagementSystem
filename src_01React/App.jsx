import React, { Component } from 'react';

export default class App extends Component {
    state = {
        count: 0,  // 点击次数
    }

    constructor(props) {
        super(props);

        this.numberRef = React.createRef();
    }

    increment = () => {
        const number = parseInt(this.numberRef.current.value);
        this.setState(state => ({ count: state.count + number }));
    }

    decrement = () => {
        const number = parseInt(this.numberRef.current.value);
        this.setState(state => ({ count: state.count - number }));
    }

    incrmentIfOdd = () => {
        if (this.state.count % 2 === 1) {
            const number = parseInt(this.numberRef.current.value);
            this.setState(state => ({ count: state.count + number }));
        }
    }

    incrmentAsync = () => {
        setTimeout(() => {
            const number = parseInt(this.numberRef.current.value);
            this.setState(state => ({ count: state.count + number }));
        }, 1000);
    }

    render() {
        // 状态数据
        // 点击次数
        const { count } = this.state;

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
