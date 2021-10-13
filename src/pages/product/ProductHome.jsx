import React, { Component } from 'react';
import { Card, Select } from "antd";

const { Option } = Select;

export default class ProductHome extends Component {
    render() {
        // card左上角标题 todo
        const cardTitle = (
            <Select defaultValue="search-name">
                <Option value="search-name">按名称搜索</Option>
                <Option value="search-describe">按描述搜索</Option>
            </Select>
        )

        // card右上角按钮 todo 
        const cardExtra = ("")

        return (
            <Card title={cardTitle} extra={cardExtra}>

            </Card>
        )
    }
}
