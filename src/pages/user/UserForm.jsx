import React, { Component } from 'react';
import { Form, Input, Select } from "antd";
import PropTypes from 'prop-types';

/**
 * 添加/修改User组件
 */
export default class UserForm extends Component {
    constructor(props) {
        super(props);

        this.formRef = React.createRef();
    }

    static propTypes = {
        setForm: PropTypes.func.isRequired,
        roles: PropTypes.array.isRequired,
        user: PropTypes.object,
    }

    /**
     * 规则校验器
     * @param {Object} rule 规则
     * @param {String} value 输入的值
     */
    handleValidator = (rule, value) => {
        const Length = value.length;
        const Reg = /^[a-zA-Z0-9_]+$/;

        if (!value) {
            return Promise.reject();
        } else if (Length < 4) {
            return Promise.reject("输入内容必须大于等于4位数！");
        } else if (Length > 12) {
            return Promise.reject("输入内容必须小于等于12位数！");
        } else if (!Reg.test(value)) {
            return Promise.reject("输入内容只能包含大小写字母、数字和下划线！");
        } else {
            // 校验通过，必须要写
            return Promise.resolve();
        }
    }

    componentDidMount() {
        // 得到 Form 实例
        const form = this.formRef.current;
        // 将form实例上传到上层组件
        this.props.setForm(form);
    }

    render() {
        // 角色相关数据 
        const { roles, user } = this.props;
        let { username, phone, email, role_id } = "";
        if (user._id) {
            username = user.username;
            phone = user.phone;
            email = user.email;
            role_id = user.role_id;
        }

        return (
            <Form
                name="userForm"
                className="userForm"
                ref={this.formRef}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 12 }}
                labelAlign="left"
            >
                <Form.Item
                    name="username"
                    label="用户名"
                    initialValue={username}
                    rules={[
                        {
                            required: true,
                            message: '必须输入用户名！',
                        },
                    ]}
                >
                    <Input placeholder="请输入用户名" />
                </Form.Item>

                {
                    user._id ? null :
                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[
                                // 密码的格式验证规则
                                {
                                    required: true,
                                    message: '必须输入密码！',
                                },
                                {
                                    validator: this.handleValidator,
                                }
                            ]}
                        >
                            <Input placeholder="请输入用户名" type="password" />
                        </Form.Item>
                }

                <Form.Item
                    name="phone"
                    label="手机号"
                    initialValue={phone}
                    rules={[
                        {
                            required: true,
                            message: '必须输入手机号！',
                        },
                    ]}
                >
                    <Input placeholder="请输入手机号" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="邮箱"
                    initialValue={email}
                    rules={[
                        {
                            required: true,
                            message: '必须输入邮箱！',
                        },
                    ]}
                >
                    <Input placeholder="请输入邮箱" />
                </Form.Item>

                <Form.Item
                    name="role_id"
                    label="角色"
                    initialValue={role_id}
                    rules={[
                        {
                            required: true,
                            message: '必须选择角色！',
                        },
                    ]}
                >
                    <Select>
                        {
                            roles.map(role => (
                                <Select.Option key={role._id} value={role._id}>
                                    {role.name}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Form>
        )
    }
}