import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Menu } from 'antd';
import { connect } from 'react-redux';

// import memoryUtils from '../../utils/memoryUtils';
import menuList from '../../config/menuConfig';
import "./LeftNav.less";
import logo from "../../assets/images/logo.png";
import { setHeadTitle } from "../../redux/actions"
import memoryUtils from '../../utils/memoryUtils';

const { SubMenu } = Menu;
/**
 * 左侧导航组件
 */
class LeftNav extends Component {
    state = {
        menuNodes: [] // 当前展示列表
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
        } else if (path.search(productsOne) !== -1 || path.search(peoductsTwo) !== -1) {
            return result = "/products";
        } else {
            return result;
        }
    }

    /**
     * 获取需要展开的列表对应的key
     * @param {String} path 当前路径
     * @returns {String} result 当前选中的key
     */
    selectKey = (path) => {
        let result;

        const products = "product";

        if (path.search(products) !== -1) {
            return result = "/admin/product";
        } else {
            result = path;
            return result;
        }
    }

    /**
     * 根据menu的数据数组生成对应的标签数组
     * @param {Array} menuList 
     */
    getMenuNodes = (menuList) => {
        // 得到当前请求的路由路径
        const path = this.props.location.pathname;

        return menuList.reduce((pre, item) => {
            // 如果当前用户有item对应的权限, 才需要显示对应的菜单项
            if (this.hasAuth(item)) {
                // 向pre添加<Menu.Item>
                if (!item.children) {
                    // 判断item是否是当前对应的item
                    if (item.key === path || path.indexOf(item.key) === 0) {
                        // 更新headerTitle状态
                        this.props.setHeadTitle(item.title);
                    }

                    pre.push((
                        <Menu.Item key={item.key} icon={item.icon} onClick={() => this.props.setHeadTitle(item.title)}>
                            <Link to={item.key}>
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item >
                    ))
                } else {

                    // 查找一个与当前请求路径匹配的子Item
                    const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                    // 如果存在, 说明当前item的子列表需要打开
                    if (cItem) {
                        this.openKey = item.key
                    }

                    // 向pre添加<SubMenu>
                    pre.push((
                        <SubMenu
                            key={item.key}
                            icon={item.icon}
                            title={item.title}
                        >
                            {this.getMenuNodes(item.children)}
                        </SubMenu>
                    ))
                }
            }

            return pre;
        }, []);
    }

    /**
     * 判断当前登录用户对item是否有权限
     * @param {*} item 
     * @return {Boolean}  
     */
    hasAuth = (item) => {
        const key = item.key;
        // const menus = memoryUtils.user.role.menus;
        // const username = memoryUtils.user.username;
        const menus = this.props.user.role.menus;
        const username = memoryUtils.user.username;

        // 当前用户是admin / 当前item是公开的 / 当前用户有此item的权限
        if (username === "admin" || item.isPublic || menus.indexOf(key) !== -1) {
            return true;
        } else if (item.children) {
            // 如果当前用户有此item的某个子item的权限
            return !!item.children.find(child => menus.indexOf(child.key) !== -1)
        }

        return false;
    }

    componentDidMount() {
        const menuNodes = this.getMenuNodes(menuList);
        this.setState({ menuNodes });
    }

    render() {
        // 获取当前请求路径
        const path = this.props.location.pathname;

        // 获取需要展开的列表
        const openKey = this.getOpenKey(path);
        // 获取需要被选中的列表
        const selectKey = this.selectKey(path);

        return (
            <div className="left-nav">
                <Link to="/admin/home" className="header-logo">
                    <img src={logo} alt="尚硅谷logo" />
                    <h1>硅谷后台</h1>
                </Link>

                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[selectKey]}
                    defaultOpenKeys={[openKey]}
                >
                    {
                        this.state.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}

export default connect(
    (state) => ({ user: state.user }),
    {
        setHeadTitle
    }
)(withRouter(LeftNav));
