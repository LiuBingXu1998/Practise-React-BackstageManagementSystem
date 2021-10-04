import React, { Component } from "react";
import { Redirect } from "react-router";
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { reqLogin } from "../../api/index.js";
import memoryUtils from "../../utils/memoryUtils.js";
import storageUtils from "../../utils/storageUtils.js";

import imgLogo from "./images/logo.png";
import "./Login.less";

/**
 * 登陆的路由组件
 */
export default class Login extends Component {
    /**
     * 规则校验器
     * @param {Object} rule 规则
     * @param {String} value 输入的值
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
     * 提交表单时的处理（发送ajax请求，验证登陆账户和密码）
     * @param {Object} values 
     */
    onFinish = (
        async (values) => {
            // 获取用户名和密码
            const { username, password } = values;
            const result = await reqLogin(username, password);

            // 请求成功时做出的响应
            if (result.status === 0) {
                // 登录成功
                message.success("登录成功！你好" + result.data.username + "!");
                // 保存用户信息到内存和本地
                memoryUtils.user = result.data;
                storageUtils.saveUser(result.data);
                // 转跳到管理界面
                this.props.history.replace(`/admin`);
            } else {
                // 登录失败
                message.error("登陆失败！用户名或密码不正确！");
            }
        }
    );

    render() {
        // 如果用户已经登录，自动跳转到admin页面
        const user = memoryUtils.user;
        if(user && user._id) {
            return <Redirect to="/admin"/>
        }

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