import React, { Component } from 'react';
import { Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";


import phonto1 from "../../assets/images/素材1.jpg";
import phonto2 from "../../assets/images/素材2.jpg";
export default class ProductDetail extends Component {
    render() {
        // card左上角标题
        // todo 添加功能
        const cardTitle = (
            <div>
                <ArrowLeftOutlined />
                <span style={{ margin: "0 15px" }}>商品详情</span>
            </div>
        )

        return (
            <Card title={cardTitle} className="product-detail">
                <List bordered>
                    <List.Item className="list-item">
                        <span className="left">商品名称：</span>
                        <span>联想ThinkPad 翼480</span>
                    </List.Item>

                    <List.Item className="list-item">
                        <span className="left">商品描述：</span>
                        <span>年度重量级新品，X390、T490全新登场 更加轻薄机身设计</span>
                    </List.Item>

                    <List.Item className="list-item">
                        <span className="left">商品价格：</span>
                        <span>66000元</span>
                    </List.Item>

                    <List.Item className="list-item">
                        <span className="left">所属分类：</span>
                        <span>电脑 ---> 笔记本</span>
                    </List.Item>

                    <List.Item className="list-item">
                        <span className="left">商品图片：</span>
                        <span>
                            <img src={phonto1} alt="展示图片" />
                            <img src={phonto2} alt="展示图片" />
                        </span>
                    </List.Item>

                    <List.Item className="list-item">
                        <span className="left">商品详情：</span>
                        <span dangerouslySetInnerHTML={{ __html: "<span style='color: red'>商品详情的信息展示</span>" }}></span>
                    </List.Item>
                </List>
            </Card>
        )
    }
}
