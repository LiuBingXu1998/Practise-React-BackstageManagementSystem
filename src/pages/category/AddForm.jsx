import React, { Component } from 'react';
import { Form, Select, Input } from "antd";

const { Option } = Select;

/**
 * 添加Form表单组件
 */
export default class AddForm extends Component {
    render() {
        return (
            <Form
                name="addForm"
                className="addForm"
            >
                <Form.Item
                    name="choceSort"
                    rules={[
                        {
                            required: true,
                            message: '必须选择分类！',
                        },
                    ]}
                >
                    <Select defaultValue="一级分类">
                        <Option value="defaultSort">一级分类</Option>
                        <Option value="1">电视</Option>
                        <Option value="2">图书</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="sortName"
                    rules={[
                        {
                            required: true,
                            message: '必须输入分类名称！',
                        },
                    ]}
                >
                    <Input placeholder="请输入分类名称" />
                </Form.Item>
            </Form>
        )
    }
}
