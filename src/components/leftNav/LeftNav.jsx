import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
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
class LeftNav extends Component {
    render() {
        // 获取当前请求路径
        const path = this.props.location.pathname;
        // 获取需要展开的列表
        const openKey = this.getOpenKey(path);

        return (
            <div className="left-nav">
                <Link to="/admin/home" className="header-logo">
                    <img src={logo} alt="尚硅谷logo" />
                    <h1>硅谷后台</h1>
                </Link>

                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >
                    <Menu.Item key="/admin/home" icon={<HomeOutlined />}>
                        <Link to="/admin/home">首页</Link>
                    </Menu.Item>

                    <SubMenu key="/products" icon={<AppstoreOutlined />} title="商品">
                        <Menu.Item key="/admin/category" icon={<UnorderedListOutlined />}>
                            <Link to="/admin/category">品类管理</Link>
                        </Menu.Item>

                        <Menu.Item key="/admin/product" icon={<ToolOutlined />}>
                            <Link to="/admin/product">商品管理</Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="/admin/user" icon={<UserOutlined />}>
                        <Link to="/admin/user">用户管理</Link>
                    </Menu.Item>

                    <Menu.Item key="/admin/role" icon={<SafetyCertificateOutlined />}>
                        <Link to="/admin/role">角色管理</Link>
                    </Menu.Item>

                    <SubMenu key="/charts" icon={<AreaChartOutlined />} title="图形图表">
                        <Menu.Item key="/admin/charts/bar" icon={<BarChartOutlined />}>
                            <Link to="/admin/charts/bar">柱形图</Link>
                        </Menu.Item>
                        <Menu.Item key="/admin/charts/line" icon={<LineChartOutlined />}>
                            <Link to="/admin/charts/line">折线图</Link>
                        </Menu.Item>
                        <Menu.Item key="/admin/charts/pie" icon={<PieChartOutlined />}>
                            <Link to="/admin/charts/pie">饼图</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }

    /**
     * 获取需要展开的列表对应的key
     * @param {String} path 当前路径
     * @returns {String} result 需要展开的key
     */
    getOpenKey = (path) => {
        let result = "";

        const charts = "charts";
        const productsOne = "category";
        const peoductsTwo = "product";

        if (path.search(charts) !== -1) {
            return result = "/charts";
        }else if (path.search(productsOne) !== -1 || path.search(peoductsTwo) !== -1) {
            return result = "/products";
        }else {
            return result;
        }
    }
}

export default withRouter(LeftNav);
