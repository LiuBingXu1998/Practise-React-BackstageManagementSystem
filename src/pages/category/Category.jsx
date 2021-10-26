import React, { Component } from 'react';
import { Button, Card, message, Table, Modal } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";

import LinkButton from '../../components/linkButton/LinkButton';
import AddForm from './AddForm';
import UpdateForm from "./UpdateForm";
import { reqGetCategorys, reqUpdateCategory, reqAddCategory } from "../../api/index";

/**
 * 品类管理路由组件
 */
export default class Category extends Component {
    state = {
        loadingFlag: false, // 载入状态
        categorys: [], // 表格数据,一级分类列表
        subCategorys: [], //表格数据，二级分类列表
        parentId: "0", // 当前需要显示的分类列表的父分类ID
        parentName: "", // 当前需要显示的分类列表的父分类名称
        showStatus: 0, // 标识添加/更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新
        nowCategory: {}, // 当前选中的单行列表对象
        nowForm: {}, // 当前Form对象
    }

    /**
     * 获取一级分类列表
     */
    getCategorys = async () => {
        // 修改载入状态
        this.setState({ loadingFlag: true });

        const { parentId } = this.state;
        const result = await reqGetCategorys(parentId);
        // 请求成功
        if (result.status === 0) {
            // 更新一级列表
            if (parentId === "0") {
                this.setState({ categorys: result.data });
            } else {
                // 更新二级列表
                this.setState({ subCategorys: result.data });
            }
        } else {
            message.error("请求列表数据失败！");
        }

        // 修改载入状态
        this.setState({ loadingFlag: false });
    }

    /**
     * 显示一级列表
     */
    showCategorys = () => {
        this.setState({
            parentId: "0",
            parentName: "",
            subCategorys: [],
        });
    }

    /**
     * 显示当前列表的子分类列表
     * @param {Object} category 当前列表
     */
    showSubCategorys = (category) => {
        // 更新状态
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => {
            // 更新完状态之后获取二级分类列表
            this.getCategorys();
        })
    }

    /**
     * 点击取消(隐藏modal框)
     */
    handleCancel = () => {
        this.setState({ showStatus: 0 });
    }

    /**
     * 显示添加的渲染框
     */
    showAdd = () => {
        this.setState({ showStatus: 1 });
    }

    /**
     * 添加分类
     */
    addCategory = () => {
        this.state.nowForm.validateFields().then(async (value) => {
            // 隐藏渲染框
            this.setState({
                showStatus: 0,
            });

            const { choceSort, sortName } = value;

            const result = await reqAddCategory(choceSort, sortName);
            if (result.status === 0) {
                // 重新显示新的列表
                this.getCategorys();
            }
        }).catch()

    }

    /**
     * 显示修改的渲染框
     * @param {Object} category 
     */
    showUpdate = (category) => {
        this.setState({
            showStatus: 2,
            nowCategory: category,
        });
    }

    /**
     * 修改nowCategoryName
     */
    setNowForm = (form) => {
        this.setState({ nowForm: form });
    }

    /**
     * 更新分类
     */
    UpdateCategory = () => {
        this.state.nowForm.validateFields().then(async (value) => {
            // 隐藏渲染框
            this.setState({
                showStatus: 0,
            });

            const categoryId = this.state.nowCategory._id;
            const categoryName = value.updateName;

            // 发送请求更新分类
            const result = await reqUpdateCategory(categoryId, categoryName);
            if (result.status === 0) {
                // 重新显示新的列表
                this.getCategorys();
            }
        }).catch()
    }

    componentDidMount() {
        this.getCategorys();
    }

    render() {
        // card左侧标题
        const cardTitle = (
            this.state.parentId === "0" ? <span>一级分类列表</span> : (
                <span>
                    <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                    <ArrowRightOutlined style={{ marginRight: 5 }} />
                    <span>{this.state.parentName}</span>
                </span>
            )
        )
        // card右上角按钮
        const cardExtra = (
            <Button type="primary" onClick={this.showAdd}>
                <PlusOutlined />添加
            </Button>
        )
        // 表格:列名称
        const columns = [
            {
                title: '分类名称',
                width: "70%",
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: "30%",
                render: (category) => (
                    <span>
                        <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
                        {this.state.parentId === "0" ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null}
                    </span>
                )
            }
        ]
        // 表格:数据
        const { categorys, parentId, subCategorys } = this.state;
        // 表格载入状态以及当前列表
        const { loadingFlag, nowCategory } = this.state;

        return (
            <Card title={cardTitle} extra={cardExtra}>
                <Table
                    bordered
                    rowKey="_id"
                    loading={loadingFlag}
                    pagination={{ defaultPageSize: 5 }}
                    columns={columns}
                    dataSource={parentId === "0" ? categorys : subCategorys}
                />

                <Modal
                    title="添加分类"
                    visible={this.state.showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                    destroyOnClose={true}
                >
                    <AddForm
                        categorys={categorys}
                        parentId={parentId}
                        setForm={(form) => this.setNowForm(form)}
                    />
                </Modal>

                <Modal
                    title="更新分类"
                    visible={this.state.showStatus === 2}
                    onOk={this.UpdateCategory}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                    destroyOnClose={true}
                >
                    <UpdateForm
                        category={nowCategory}
                        setForm={(form) => this.setNowForm(form)}
                    />
                </Modal>
            </Card>
        )
    }
}
