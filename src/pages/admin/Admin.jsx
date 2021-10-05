import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Layout } from 'antd';

import memoryUtils from '../../utils/memoryUtils';
import LeftNav from "../../components/leftNav/LeftNav";
import Header from "../../components/header/Header";

import "./Admin.less";

const { Footer, Sider, Content } = Layout;

/**
 * 管理的路由组件
 */
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user;

        // 如果内存没有存储user ==> 当前未登录，跳转登录页面
        if (!user || !user._id) {
            return <Redirect to="/login" />
        }

        return (
            <Layout className="admin">
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header />
                    <Content>Content</Content>
                    <Footer className="footer">推荐使用Chrome谷歌浏览器，以便获得更好的体验</Footer>
                </Layout>
            </Layout>
        )
    }
}
