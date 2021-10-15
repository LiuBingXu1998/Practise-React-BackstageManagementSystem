import React, { Component } from 'react';
import { PlusOutlined } from "@ant-design/icons";
import { Card, Select, Input, Button, Table, message } from "antd";

import { reqProducts, reqSearchProducts } from "../../api/index";
import { PAGE_SIZE } from "../../utils/constants";
import LinkButton from '../../components/linkButton/LinkButton';

const { Option } = Select;

export default class ProductHome extends Component {
    // constructor(props) {
    //     super(props);

    // }

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
     * todo 添加动态
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
                    dataIndex: 'status',
                    // status为当前表格内的值
                    render: (status) => {
                        return (
                            <div>
                                <Button type="primary">上架</Button>
                                <span style={{ margin: "0 0 0 15px" }}>待售</span>
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
                                <LinkButton>详情</LinkButton>
                                <LinkButton>修改</LinkButton>
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
        // todo 添加功能 
        const cardExtra = (
            <Button type="primary">
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
