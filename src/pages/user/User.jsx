import React, { Component } from 'react';
import { Button, Card, Table, Modal, message } from 'antd';

import timeTools from '../../utils/dataUtils';
import { reqUsers, reqAddOrUpdateUser, reqDeleteUser } from '../../api/index';

import { PAGE_SIZE } from "../../utils/constants";
import UserForm from './UserForm';
import LinkButton from "../../components/linkButton/LinkButton";


/**
 * 用户管理路由
 */
export default class User extends Component {
    constructor(props) {
        super(props);

        // 角色名集合
        this.roleNames = {};
        // 表格:列名称 
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '电话',
                dataIndex: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: (create_time) => timeTools.formateDate(create_time),
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: (role_id) => {
                    // 根据role_id找到匹配的role对象
                    const roleName = this.roleNames[role_id];
                    return roleName;
                }
            },
            {
                title: "操作",
                render: (user) => {
                    return (
                        <span>
                            <LinkButton onClick={() => this.updateUser(user)}>修改</LinkButton>
                            <LinkButton onClick={() => this.delectUser(user)}>删除</LinkButton>
                        </span>
                    )
                }
            }
        ];
        // form对象
        this.form = {};
    }

    state = {
        loadingFlag: false,  // Table表格是否载入状态
        users: [],           // 用户数组
        user: {},            // 当前用户
        roles: [],           // 角色数组
        isShow: false,       // 是否展示模态框
    }

    /**
     * 初始化角色数组
     * @param {Array} roles 角色数组
     */
    initRoleName = (roles) => {
        // 获取roleNames;
        const roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name;
            return pre;
        }, {});
        // 保存
        this.roleNames = roleNames;
    }

    /**
     * 添加/更新用户
     */
    addOrUpdateUser = async () => {
        // 进行表单验证
        await this.form.validateFields()
            .then(async (values) => {
                // 收集数据
                const user = values;
                if (this.state.user._id) {
                    user._id = this.state.user._id;
                }
                // 发送请求
                const result = await reqAddOrUpdateUser(user);

                if (result.status === 0) {
                    message.success(`${this.state.user._id ? "修改" : "添加"}用户成功！`);
                    // 更新数据
                    this.getUsers();
                } else {
                    message.error(`${this.state.user._id ? "修改" : "添加"}用户失败！`);
                    console.log(result);
                }
            }).catch(errorInfo => {
                message.error(`${this.state.user._id ? "修改" : "添加"}用户失败！`);
                console.log("errorInfo", errorInfo)
            });
        // 关闭Modal
        this.handleCancel();
    }

    /**
     * 更新用户
     * @param {Object} user 当前用户
     */
    updateUser = (user) => {
        // 打开Modal
        this.setState({ user, isShow: true });
    }

    /**
     * 监听Modal取消事件，隐藏Modal
     */
    handleCancel = () => {
        this.setState({ isShow: false, user: {} });
    }

    /**
     * 获取用户数组
     */
    getUsers = async () => {
        this.setState({ loadingFlag: true });

        const result = await reqUsers();
        if (result.status === 0) {
            this.setState({
                users: result.data.users,
                roles: result.data.roles,
            });
            this.initRoleName(result.data.roles);
        }

        this.setState({ loadingFlag: false });
    }

    /**
     * 获取form对象
     * @param {Object} form form对象
     */
    setForm = (form) => {
        this.form = form;
    }

    /**
     * 删除用户
     * @param {Object} user 当前用户
     */
    delectUser = (user) => {
        Modal.confirm({
            title: `你确定删除${user.username}吗？`,
            okText: '确定',
            cancelText: "取消",
            onOk: async () => {
                const result = await reqDeleteUser(user._id);
                if (result.status === 0) {
                    message.success("删除用户成功！");
                    // 更新列表
                    this.getUsers();
                } else {
                    message.error("删除用户失败！");
                    console.log(result);
                }
            }
        });
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        // card左上角相关按钮
        const cardTitle = (
            <Button type="primary" onClick={() => this.setState({ isShow: true })}>
                创建用户
            </Button>
        )

        // Table相关数据
        // Table载入状态
        const { loadingFlag, users } = this.state;
        // Table列名称
        const { columns } = this;

        // Modal相关数据
        const { isShow, roles, user } = this.state;

        return (
            <Card title={cardTitle}>
                <Table
                    rowKey="_id"
                    columns={columns}
                    dataSource={users}
                    bordered={true}
                    loading={loadingFlag}
                    pagination={{ defaultPageSize: PAGE_SIZE }}
                />

                <Modal
                    title={user._id ? "修改用户" : "创建用户"}
                    okText="确定"
                    cancelText="取消"
                    onOk={this.addOrUpdateUser}
                    onCancel={this.handleCancel}
                    visible={isShow}
                    destroyOnClose={true}
                >
                    <UserForm setForm={this.setForm} roles={roles} user={user} />
                </Modal>
            </Card>
        )
    }
}
