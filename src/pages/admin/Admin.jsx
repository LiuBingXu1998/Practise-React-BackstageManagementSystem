import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';

// import memoryUtils from '../../utils/memoryUtils';
import LeftNav from "../../components/leftNav/LeftNav";
import Header from "../../components/header/Header";
import Home from "../home/Home";
import Category from "../category/Category";
import Product from "../product/Product";
import User from "../user/User";
import Role from "../role/Role";
import Bar from "../charts/Bar";
import Line from "../charts/Line";
import Pie from "../charts/Pie";

import "./Admin.less";

const { Footer, Sider, Content } = Layout;

/**
 * 管理的路由组件
 */
class Admin extends Component {
    render() {
        // const user = memoryUtils.user;
        const user = this.props.user;

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
                    <Header>Header</Header>

                    <Content className="content">
                        <Switch>
                            <Route path="/admin/home" component={Home} />
                            <Route path="/admin/category" component={Category} />
                            <Route path="/admin/product" component={Product} />
                            <Route path="/admin/user" component={User} />
                            <Route path="/admin/role" component={Role} />
                            <Route path="/admin/charts/bar" component={Bar} />
                            <Route path="/admin/charts/Line" component={Line} />
                            <Route path="/admin/charts/pie" component={Pie} />
                            <Redirect to='/admin/home' />
                        </Switch>
                    </Content>

                    <Footer className="footer">推荐使用Chrome谷歌浏览器，以便获得更好的体验</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    {}
)(Admin);