import React, { Component } from 'react';
import { Form, Input } from "antd";
import PropTypes from 'prop-types';

/**
 * 添加Form表单组件
 */
export default class AddForm extends Component {
    constructor(props) {
        super(props);

        this.formRef = React.createRef();
    }

    static propTypes = {
        setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    }

    componentDidMount() {
        // 得到 Form 实例
        const form = this.formRef.current;
        this.props.setForm(form);
    }

    render() {
        return (
            <Form
                name="addForm"
                className="addForm"
                ref={this.formRef}
            >
                <Form.Item
                    name="roleName"
                    label="角色名称"
                    rules={[
                        {
                            required: true,
                            message: '必须输入角色名称！',
                        },
                    ]}
                >
                    <Input placeholder="请输入角色名称" />
                </Form.Item>
            </Form>
        )
    }
}