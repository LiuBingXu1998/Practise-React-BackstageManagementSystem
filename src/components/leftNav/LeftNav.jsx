import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Menu } from 'antd';
import {
    HomeOutlined,
    AppstoreOutlined,
    UserOutlined,
    SafetyCertificateOutlined,
    AreaChartOutlined,
    UnorderedListOutlined,
    ToolOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined
} from '@ant-design/icons';

import "./LeftNav.less";
import logo from "../../assets/images/logo.png";

const { SubMenu } = Menu;
/**
 * 左侧导航组件
 */
export default class LeftNav extends Component {
    render() {
        return (
            <div className="left-nav">
                <Link to="/admin/home" className="header-logo">
                    <img src={logo} alt="尚硅谷logo" />
                    <h1>硅谷后台</h1>
                </Link>

                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to="/admin/home">首页</Link>
                    </Menu.Item>

                    <SubMenu key="sub1" icon={<AppstoreOutlined />} title="商品">
                        <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                            <Link to="/admin/category">品类管理</Link>
                        </Menu.Item>

                        <Menu.Item key="3" icon={<ToolOutlined />}>
                            <Link to="/admin/product">商品管理</Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="4" icon={<UserOutlined />}>
                        <Link to="/admin/user">用户管理</Link>
                    </Menu.Item>

                    <Menu.Item key="5" icon={<SafetyCertificateOutlined />}>
                        <Link to="/admin/role">角色管理</Link>
                    </Menu.Item>

                    <SubMenu key="sub2" icon={<AreaChartOutlined />} title="图形图表">
                        <Menu.Item key="6" icon={<BarChartOutlined />}>
                            <Link to="/admin/charts/bar">柱形图</Link>
                        </Menu.Item>
                        <Menu.Item key="7" icon={<LineChartOutlined />}>
                            <Link to="/admin/charts/line">折线图</Link>
                        </Menu.Item>
                        <Menu.Item key="8" icon={<PieChartOutlined />}>
                            <Link to="/admin/charts/pie">饼图</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
