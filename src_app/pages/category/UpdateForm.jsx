import React, { Component } from 'react';
import { Form, Input } from "antd";
import PropTypes from 'prop-types';

/**
 * 更新Form表单组件
 */
export default class UpdateForm extends Component {
    static propTypes = {
        category: PropTypes.object.isRequired,
        setForm: PropTypes.func.isRequired,
    }

    formRef = React.createRef();

    componentDidMount() {
        // 得到 Form 实例
        const form = this.formRef.current;
        this.props.setForm(form);
    }

    render() {
        const { category } = this.props;

        return (
            <Form
                name="updateForm"
                className="updateForm"
                initialValues={{ updateName: category.name }}
                ref={this.formRef}
            >
                <Form.Item
                    name="updateName"
                    rules={[
                        {
                            required: true,
                            message: '请输入更新后的分类名称/取消',
                        },
                    ]}
                >
                    <Input placeholder="请输入更新后的分类名称" />
                </Form.Item>
            </Form>
        )
    }
}
