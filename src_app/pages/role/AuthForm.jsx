import React, { Component } from 'react';
import { Form, Input, Tree } from "antd";
import PropTypes from 'prop-types';

import menuList from '../../config/menuConfig';

export default class AuthForm extends Component {
    constructor(props) {
        super(props);

        this.treeData = this.getTreeData(menuList);
    }

    state = {
        checkedKeys: [],   // Tree被选中的菜单
    }

    static propTypes = {
        role: PropTypes.object.isRequired,   // 当前对象
    }

    /**
     * 初始化被选中菜单
     */
    initCheckedKeys = () => {
        const { menus } = this.props.role;
        this.setState({ checkedKeys: menus });
    }

    /**
     * 获取Tree数据
     * @param {Array} menuList 菜单数组
     */
    getTreeData = (menuList) => {
        let treeData = [{
            title: "平台权限",
            key: "all",
            children: [...menuList],
        }]
        return treeData;
    }

    /**
     * 监听Tree选择改变事项
     * @param {Array} checkedKeys 当前被选中的数组
     */
    onCheck = (checkedKeys) => {
        this.setState({ checkedKeys });
    }

    /**
     * 获取当前menus
     */
    getMenus = () => {
        return this.state.checkedKeys;
    }

    componentDidMount() {
        this.initCheckedKeys();
    }

    render() {
        const { role } = this.props;
        const { treeData } = this;
        const { checkedKeys } = this.state;

        return (
            <div>
                <Form.Item
                    label="角色名称"
                >
                    <Input value={role.name} disabled />
                </Form.Item>

                <Tree
                    checkable
                    defaultExpandAll={true}
                    treeData={treeData}
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                />
            </div>
        )
    }
}
