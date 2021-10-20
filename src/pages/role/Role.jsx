import React, { Component } from 'react';
import { Button, Card, Table, Modal, message } from 'antd';

import AddForm from './AddForm';
import AuthForm from "./AuthForm";
import { PAGE_SIZE } from "../../utils/constants";
import { reqRoles, reqAddRole, reqUpdateRole } from "../../api/index"

/**
 * 角色管理路由
 */
export default class Role extends Component {
    constructor(props) {
        super(props);

        this.form = {};                   // 初始化form表单对
        this.auth = React.createRef();    // authForm组件ref
    }

    state = {
        roles: [],             // 角色列表
        role: {},              // 当前选中的Role
        loadingFlag: false,    // Table表格是否载入状态
        isShowAdd: false,      // Modal创建角色
        isShowAuth: false,     // Modal设置角色权限
    }

    /**
     * 监听Table表格onRow事件
     * @param {Object} role 当前行对象(自动传入)
     */
    onRow = (role) => {
        return {
            onClick: event => {
                this.setState({ role });
            }
        }
    }

    /**
     * 获取所有角色
     */
    getRoles = async () => {
        const result = await reqRoles();

        if (result.status === 0) {
            this.setState({ roles: result.data });
        } else {
            console.log("errror", result)
        }
    }

    /**
     * 添加角色
     */
    addRole = () => {
        // 隐藏Modal
        this.setState({ isShowAdd: false });

        // 进行表单验证
        this.form.validateFields()
            .then(async (values) => {
                // 搜集输入数据
                const { roleName } = values;
                // 请求添加
                const result = await reqAddRole(roleName);
                // 根据结果提示/更新显示
                if (result.status === 0) {
                    message.success("添加角色成功！");
                    // 新产生的角色
                    const role = result.data;
                    // 更新roles状态
                    this.setState(state => {
                        return {
                            roles: [...state.roles, role]
                        }
                    });
                }
            })
            .catch(errorInfo => {
                message.error("添加角色失败！");
            });
    }

    /**
     * 更新角色
     */
    updateRole = async () => {
        // 隐藏Modal
        this.setState({ isShowAuth: false });

        const role = this.state.role;
        // 获取最新的menus
        const menus = this.auth.current.getMenus();
        // 更新role
        role.menus = menus;
        // 发送更新请求
        const result = await reqUpdateRole(role);
        if (result.status === 0) {
            message.success("角色权限修改成功！");
            // 更新列表
            // 方法一：this.getRoles();
            // 方法二： 
            this.setState({ roles: [...this.state.roles] });
        } else {
            message.error("角色权限修改失败！");
        }
    }

    /**
     * 监听Modal取消事件，隐藏Modal
     */
    handleCancel = () => {
        this.setState({
            isShowAdd: false,
            isShowAuth: false
        });
    }

    componentDidMount() {
        this.getRoles();
    }

    render() {
        // card左上角相关按钮
        const cardTitle = (
            <span>
                <Button
                    type="primary"
                    style={{ margin: " 0 5px" }}
                    onClick={() => this.setState({ isShowAdd: true })}
                >
                    创建角色
                </Button>

                <Button
                    type="primary"
                    style={{ margin: " 0 5px" }}
                    disabled={!this.state.role._id}
                    onClick={() => this.setState({ isShowAuth: true })}
                >
                    设置角色权限
                </Button>
            </span>
        )

        // Table表格相关数据 
        // 表格:列名称
        const columns = [
            {
                title: '角色名称',
                dataIndex: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time'
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time'
            },
            {
                title: '授权人',
                dataIndex: 'auth_name'
            },
        ]
        // Table是否载入状态 用户列表 当前选中用户
        const { loadingFlag, roles, role } = this.state;

        // Modal模态框相关数据
        const { isShowAdd, isShowAuth } = this.state;

        return (
            <Card title={cardTitle}>
                <Table
                    rowKey="_id"
                    columns={columns}
                    dataSource={roles}
                    rowSelection={{ type: "radio", selectedRowKeys: [role._id] }}
                    onRow={this.onRow}
                    bordered
                    loading={loadingFlag}
                    pagination={{ defaultPageSize: PAGE_SIZE }}
                />

                <Modal
                    title="创建角色"
                    okText="确定"
                    cancelText="取消"
                    onOk={this.addRole}
                    onCancel={this.handleCancel}
                    visible={isShowAdd}
                    destroyOnClose={true}
                >
                    <AddForm
                        setForm={(form) => this.form = form}
                    />
                </Modal>

                <Modal
                    title="设置角色权限"
                    okText="确定"
                    cancelText="取消"
                    onOk={this.updateRole}
                    onCancel={this.handleCancel}
                    visible={isShowAuth}
                    destroyOnClose={true}
                >
                    <AuthForm role={role} ref={this.auth} />
                </Modal>
            </Card>
        )
    }
}