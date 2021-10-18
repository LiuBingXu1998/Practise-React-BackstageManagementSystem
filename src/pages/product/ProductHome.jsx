import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Card, Select, Input, Button, Table, message } from "antd";

import { reqProducts, reqSearchProducts, reqUpdateStatus } from "../../api/index";
import { PAGE_SIZE } from "../../utils/constants";
import LinkButton from '../../components/linkButton/LinkButton';

const { Option } = Select;

class ProductHome extends Component {
    constructor(props) {
        super(props);

        this.pageNum = 1; // 当前显示的页码
    }

    state = {
        columns: [],              // Table表单名称
        dataSource: [],           // Table表单数据
        total: 0,                 // 商品的总数量
        TableLoading: false,      // 表单载入状态
        searchName: "",           // 搜索的关键字
        searchType: "productName",// 搜索的类型
    }

    /**
     * 初始化Table列表名称
     */
    initColums = () => {
        this.setState({
            columns: [
                {
                    title: '商品名称',
                    dataIndex: 'name',
                    width: "17%",
                },
                {
                    title: '商品描述',
                    dataIndex: 'desc',
                    width: "50%",
                },
                {
                    title: '价格',
                    dataIndex: 'price',
                    // price为当前表格内的值
                    render: price => `¥` + price,
                    width: "6%",
                },
                {
                    title: '状态',
                    // object为当前表格所在行对象
                    render: (object) => {
                        const { status, _id } = object;
                        return (
                            <div>
                                <Button type="primary" onClick={() => this.handleUpDownProductOnClick(_id, status)}>
                                    {status === 1 ? "下架" : "上架"}
                                </Button>
                                <span style={{ margin: "0 0 0 15px" }}>{status === 1 ? "在售" : "已下架"}</span>
                            </div>
                        )
                    },
                    width: "14%",
                },
                {
                    title: '操作',
                    // object为当前表格所在行对象
                    render: (object) => {
                        return (
                            <div>
                                <LinkButton onClick={() => this.handleDetailOnClick(object)}>详情</LinkButton>
                                <LinkButton onClick={() => this.handleUpdateOnClick(object)}>修改</LinkButton>
                            </div>
                        )
                    },
                    width: "14%",
                },
            ]
        })
    }

    /**
     * 获取指定页码Table数据
     * @param {Number} pageNum 页码
     */
    getDataSource = async (pageNum) => {
        // 保存当前显示页码
        this.pageNum = pageNum;

        let result;

        // 从状态栏中获取搜索的关键字和搜索类型
        const { searchName, searchType } = this.state;

        // 判断请求类型? 搜索请求还是一般类型请求
        if (!searchName) {
            // 发送请求获取数据
            result = await reqProducts(pageNum, PAGE_SIZE);
        } else {
            // 发送请求获取数据
            result = await reqSearchProducts(pageNum, PAGE_SIZE, searchName, searchType);
        }

        // 请求成功
        if (result.status === 0) {
            // total: 商品总数量
            // list： 当前页面数据
            const { total, list } = result.data;
            // 更新state
            this.setState({ total: total, dataSource: list });
        } else {
            message.error(`获取第${pageNum}页数据失败!`);
        }
    }

    /**
     * 监听分页onChange事件
     * @param {Number} pageNum 页码，自带的默认参数
     */
    handlePageOnChange = (pageNum) => {
        // 设置表单载入状态
        this.setState({ TableLoading: true });

        // 获取指定页面的数据
        this.getDataSource(pageNum);

        // 设置表单载入状态
        this.setState({ TableLoading: false });
    }

    /**
     * 监听选择框onChange事件
     * @param {String} value 当前选择项,自带的默认参数(productName/productDesc)
     */
    handleSelectOnChange = (value) => {
        this.setState({ searchType: value });
    }

    /**
     * 监听输入框onChange事件
     * @param {String} event 当前输入的事件对象，自带的默认参数
     */
    handleInputOnChange = (event) => {
        this.setState({ searchName: event.target.value });
    }

    /**
     * 监听搜索按钮onClick事件
     */
    handleSearchOnClick = () => {
        // 设置表单载入状态
        this.setState({ TableLoading: true });

        // 获取指定页面的数据
        this.getDataSource(1);

        // 设置表单载入状态
        this.setState({ TableLoading: false });
    }

    /**
     * 监听详情按钮onClick事件
     * @param {Object} object 当前表格所在行对象
     */
    handleDetailOnClick = (object) => {
        this.props.history.push(`/admin/product/detail`, { object });
    }

    /**
     * 监听修改按钮onClick事件
     * @param {Object} object 当前表格所在行对象
     */
    handleUpdateOnClick = (object) => {
        this.props.history.push(`/admin/product/addUpdate`, object)
    }

    /**
     * 监听上下架按钮onClick事件
     * @param {String} productId 商品ID
     * @param {Number} status    商品状态
     */
    handleUpDownProductOnClick = async (productId, status) => {
        // 更改status状态
        status === 1 ? status = 2 : status = 1;

        const result = await reqUpdateStatus(productId, status);
        if (result.status === "0") {
            message.success("更新商品状态成功！");
            // 更新页面
            this.getDataSource(this.pageNum);
        }
    }

    /**
     * 监听添加商品按钮onClick事件
     */
    handleAddProductOnClick = () => {
        this.props.history.push(`/admin/product/addUpdate`);
    }

    componentDidMount() {
        this.initColums();       // 初始化Table列表名称
        this.getDataSource(1);   // 获取指定页码Table数据
    }

    render() {
        // Card左上角搜索关键字和搜索类型数据
        const { searchName, searchType } = this.state;

        // card左上角标题
        const cardTitle = (
            <div>
                <Select
                    value={searchType}
                    style={{ width: 120 }}
                    onChange={this.handleSelectOnChange}
                >
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input
                    value={searchName}
                    type="text"
                    onChange={this.handleInputOnChange}
                    placeholder="请输入关键字"
                    style={{ width: 150, margin: "0 15px" }}
                />
                <Button type="primary" onClick={this.handleSearchOnClick}>搜索</Button>
            </div >

        )

        // card右上角按钮
        const cardExtra = (
            <Button type="primary" onClick={this.handleAddProductOnClick}>
                <PlusOutlined />
                添加商品
            </Button>
        )

        // Table表单名和数据
        const { columns, dataSource, TableLoading, total } = this.state;

        return (
            <Card title={cardTitle} extra={cardExtra}>
                <Table
                    rowKey="_id"
                    columns={columns}
                    dataSource={dataSource}
                    bordered
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        total: total,
                        onChange: this.handlePageOnChange,
                    }}
                    loading={TableLoading}
                />
            </Card>
        )
    }
}

export default withRouter(ProductHome);