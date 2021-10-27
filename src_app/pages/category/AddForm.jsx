import React, { Component } from 'react';
import { Form, Select, Input } from "antd";
import PropTypes from 'prop-types';

const { Option } = Select;

/**
 * 添加Form表单组件
 */
export default class AddForm extends Component {
    static propTypes = {
        categorys: PropTypes.array.isRequired,
        parentId: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired,
    }

    formRef = React.createRef();

    componentDidMount() {
        // 得到 Form 实例
        const form = this.formRef.current;
        this.props.setForm(form);
    }

    render() {
        const { categorys, parentId } = this.props;

        return (
            <Form
                name="addForm"
                className="addForm"
                ref={this.formRef}
            >
                <Form.Item
                    name="choceSort"
                    rules={[
                        {
                            required: true,
                            message: '必须选择分类！',
                        },
                    ]}
                    initialValue={parentId}
                >
                    <Select>
                        <Option value="0" key="0">一级分类</Option>
                        {
                            categorys.map(item => {
                                return <Option value={item._id} key={item._id}>{item.name}</Option>
                            })
                        }
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
