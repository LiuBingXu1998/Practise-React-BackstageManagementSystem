import React, { Component } from "react";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import imgLogo from "./images/logo.png";

import "./Login.less";

/**
 * 登入的路由组件
 */
export default class Login extends Component {
    /**
     * 规则校验器
     * @param {*} rule 规则
     * @param {*} value 输入的值
     */
    handleValidator = (rule, value) => {
        const Length = value.length;
        const Reg = /^[a-zA-Z0-9_]+$/;

        if (!value) {
            return Promise.reject("输入框不能为空！");
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

    /**
     * need todo
     */
    onFinish = () => {

    }

    render() {
        return (
            <div className="login">

                <header className="login-header">
                    <img src={imgLogo} alt="logo图标" />
                    <h2>React项目：后台管理系统</h2>
                </header>

                <section className="login-section">
                    <h2>用户登陆</h2>
                    <Form name="normal_login" className="login-form" initialValues={{ remember: true, }} onFinish={this.onFinish}>

                        <Form.Item name="username"
                            rules={[
                                // 用户名的格式验证规则
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                                {
                                    validator: this.handleValidator,
                                }
                            ]}>

                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" style={{ color: "rgba(0,0,0,.25)" }} />}
                                placeholder="用户名"
                            />
                        </Form.Item>

                        <Form.Item name="password"
                            rules={[
                                // 密码的格式验证规则
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                                {
                                    validator: this.handleValidator,
                                }
                            ]}>

                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" style={{ color: "rgba(0,0,0,.25)" }} />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}