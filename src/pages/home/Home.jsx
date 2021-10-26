import React, { Component } from 'react';

import "./Home.less";
/**
 * 首页路由组件
 */
export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <span className="welcome">欢迎使用尚硅谷后台系统！</span>
            </div>
        )
    }
}
