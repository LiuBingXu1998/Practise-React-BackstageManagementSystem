import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import LinkButton from '../../components/linkButton/LinkButton';
import { BASE_IMG_URL } from "../../utils/constants";
import { reqCategory } from "../../api/index"

class ProductDetail extends Component {
    state = {
        cName1: "", // 一级分类
        cMame2: "", // 二级分类
    }

    /**
     * 监听回退按钮onClick事件
     */
    handleBackOnClick = () => {
        this.props.history.goBack();
    }

    async componentDidMount() {
        // 获取路由组建传递过来的数据，object为当前表格所在行对象
        const { pCategoryId, categoryId } = this.props.location.state.object;

        if (pCategoryId === "0") {
            const result = await reqCategory(categoryId);
            const cName1 = result.data.name;
            this.setState({ cName1 });
        } else {
            const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)]);
            const cName1 = results[0].data.name;
            const cName2 = results[1].data.name;
            this.setState({ cName1, cName2 });
        }
    }

    render() {
        // 获取路由组建传递过来的数据，object为当前表格所在行对象
        const { name, desc, price, detail, imgs } = this.props.location.state.object;

        // 获取state数据
        const { cName1, cName2 } = this.state;

        // card左上角标题
        const cardTitle = (
            <div>
                <LinkButton onClick={this.handleBackOnClick}>
                    <ArrowLeftOutlined style={{ color: "green", fontSize: "20px" }} />
                </LinkButton>
                <span style={{ margin: "0 15px" }}>商品详情</span>
            </div>
        )

        return (
            <Card title={cardTitle} className="product-detail">
                <List bordered>
                    <List.Item className="list-item">
                        <span className="left">商品名称：</span>
                        <span>{name}</span>
                    </List.Item>

                    <List.Item className="list-item">
                        <span className="left">商品描述：</span>
                        <span>{desc}</span>
                    </List.Item>

                    <List.Item className="list-item">
                        <span className="left">商品价格：</span>
                        <span>{price}元</span>
                    </List.Item>

                    <List.Item className="list-item">
                        <span className="left">所属分类：</span>
                        <span>{cName1} {cName2 ? " --> " + cName2 : ""}</span>
                    </List.Item>

                    <List.Item className="list-item">
                        <span className="left">商品图片：</span>
                        <span>
                            {
                                imgs.map(img => <img src={BASE_IMG_URL + img} alt="展示图片" key={img} />)
                            }
                        </span>
                    </List.Item>

                    <List.Item className="list-item">
                        <span className="left">商品详情：</span>
                        <span dangerouslySetInnerHTML={{ __html: detail }}></span>
                    </List.Item>
                </List>
            </Card>
        )
    }
}

export default withRouter(ProductDetail);
