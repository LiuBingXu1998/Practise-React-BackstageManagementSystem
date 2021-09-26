import React, { Component } from "react";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import imgLogo from "./images/logo.png";

import "./Login.less";

/**
 * 登入的路由组件
 */
export default class Login extends Component {
    render() {
        return (
            <div className="login">

                <header className="login-header">
                    <img src={imgLogo} alt="logo图标" />
                    <h2>React项目：后台管理系统</h2>
                </header>

                <content className="login-content">
                    <h2>用户登陆</h2>
                    {/* <Form name="normal_login" className="login-form" initialValues={{remember: true,}} onFinish={this.onFinish}> */}
                    <Form name="normal_login" className="login-form">

                        <Form.Item name="username">
                            <Input prefix={<UserOutlined className="site-form-item-icon" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="用户名" />
                        </Form.Item>

                        <Form.Item name="password">
                            <Input prefix={<LockOutlined className="site-form-item-icon" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="密码" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </content>
            </div>
        )
    }
}
