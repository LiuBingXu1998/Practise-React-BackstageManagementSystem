import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Modal } from "antd"

import LinkButton from '../linkButton/LinkButton';
import { reqWeather } from "../../api/index";
import timeTools from '../../utils/dataUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from "../../utils/storageUtils"
import menuList from "../../config/menuConfig";

import "./Header.less";

const formateDate = timeTools.formateDate;
/**
 * 头部组件
 */
class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),
        weather: "",
    }


    /**
     * 自动更新时间
     */
    upDateTime = () => {
        this.intervalId = setInterval(() => {
            const time = formateDate(Date.now());
            this.setState({ currentTime: time });
        }, 1000);
    }

    /**
     * 自动更新天气
     */
    upDateWeather = async () => {
        const { weather } = await reqWeather();
        this.setState({ weather });
    }

    /**
     * 自动更新title
     */
    upDateTitle = () => {
        let title;
        // 获取当前路径
        const path = this.props.location.pathname;
        // 遍历比较
        menuList.forEach(item => {
            // 如果item的key === 当前路径
            if (item.key === path) {
                title = item.title;
            } else if (item.children) {
                // 查找子item，匹配则取出
                const cItem = item.children.find(cItem => cItem.key === path)
                // 如果cItem有值，说明找到了
                if (cItem) {
                    title = cItem.title;
                }
            }
        })
        return title;
    }

    /**
     * 退出登录
     */
    logout = () => {
        Modal.confirm({
            content: '确定退出吗？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                // 清除登录信息
                storageUtils.removeUser();
                memoryUtils.user = {};
                // 跳转login页面
                this.props.history.replace("/login");
            },
        });
    }

    componentDidMount() {
        this.upDateTime();
        this.upDateWeather();
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        const { currentTime, weather } = this.state;
        const user = memoryUtils.user.username;
        const title = this.upDateTitle();

        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎, <span className="userName">{user}</span></span>
                    <LinkButton onClick={this.logout}> 退出 </LinkButton>
                </div>

                <div className="header-bottom">
                    <span className="nowPage">{title}</span>

                    <div className="timeAndWeather">
                        <span className="time">{currentTime}</span>
                        <span className="weatherFont">{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);
