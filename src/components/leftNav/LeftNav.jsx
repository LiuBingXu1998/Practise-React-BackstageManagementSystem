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
    WindowsOutlined,
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
                {/* todo添加路由指向 */}
                <Link to="" className="header-logo">
                    <img src={logo} alt="尚硅谷logo" />
                    <h1>硅谷后台</h1>
                </Link>

                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        首页
                    </Menu.Item>

                    <SubMenu key="sub1" icon={<AppstoreOutlined />} title="商品">
                        <Menu.Item key="2" icon={<UnorderedListOutlined />}>品类管理</Menu.Item>
                        <Menu.Item key="3" icon={<ToolOutlined />}>商品管理</Menu.Item>
                    </SubMenu>

                    <Menu.Item key="4" icon={<UserOutlined />}>
                        用户管理
                    </Menu.Item>

                    <Menu.Item key="5" icon={<SafetyCertificateOutlined />}>
                        角色管理
                    </Menu.Item>

                    <SubMenu key="sub2" icon={<AreaChartOutlined />} title="图形图表">
                        <Menu.Item key="6" icon={<BarChartOutlined />}>柱形图</Menu.Item>
                        <Menu.Item key="7" icon={<LineChartOutlined />}>折线图</Menu.Item>
                        <Menu.Item key="8" icon={<PieChartOutlined />}>饼图</Menu.Item>
                    </SubMenu>

                    <Menu.Item key="5" icon={<WindowsOutlined />}>
                        订单管理
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
