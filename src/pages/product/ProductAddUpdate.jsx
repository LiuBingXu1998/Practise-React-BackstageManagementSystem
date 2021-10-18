import React, { Component } from 'react';
import {
    Card,
    Form,
    Input,
    Button,
    Cascader
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import LinkButton from '../../components/linkButton/LinkButton';
import PictureWall from "./PictureWall";
import { reqGetCategorys } from "../../api/index";

export default class ProductAddUpdate extends Component {
    constructor(props) {
        super(props);

        this.pictureWallRef = React.createRef(); // PictureWall组件的ref
    }

    state = {
        cascaderOptions: [],  // Cascader的选择列表
        isUpdate: false,      // 是否是更新的标识
        product: {},          // 当前修改的对象
    };

    /**
     * 监听回退按钮onClick事件
     */
    handleBackOnClick = () => {
        this.props.history.goBack();
    }

    /**
     * 监听Form提交按钮submit事件
     * @param {Object} object 表单数据对象(自动传入)
     * todo 添加逻辑,发送ajax请求
     */
    handleOnFinish = (object) => {
        console.log("onFinish", object);

        // 获取imgs数据
        const imgs = this.pictureWallRef.current.getImgs();
    }

    /**
     * 监听Cascader选择加载下一级表单
     * @param {Array} selectedOptions 当前选择项的数组(自动传入)
     */
    handleLoadData = async (selectedOptions) => {
        // 获取选中的对象
        const targetOption = selectedOptions[0];
        // 设置loading加载状态
        targetOption.loading = true;

        // 异步发送请求获取数据，更新数据
        const subCategorys = await this.getCatergorys(targetOption.value);

        if (subCategorys && subCategorys.length > 0) {
            // 生成二级列表的options
            const childOptions = subCategorys.map(c => {
                return {
                    value: c._id,
                    label: c.name,
                    isLeaf: true,
                }
            });
            // 关联到当前options上
            targetOption.children = childOptions;
        } else { // 当前选中的分类没有二级分类
            targetOption.isLeaf = true;
        }

        // 设置loading加载状态
        targetOption.loading = false;

        // 更新状态
        this.setState({
            cascaderOptions: [...this.state.cascaderOptions],
        });
    };

    /**
     * 获取一级/二级列表
     * @param {String} parentId 父对象ID
     */
    getCatergorys = async (parentId) => {
        const result = await reqGetCategorys(parentId);

        if (result.status === 0) {
            // 获取categorys
            const categorys = result.data;

            // 如果是一级分类列表
            if (parentId === "0") {
                // 转换cascaderOptions
                this.initCascaderOptions(categorys);
            } else { // 否则是二级列表
                return categorys;
            }

        }
    }

    /**
     * 将categorys转换为cascaderOptions
     * @param {Array} categorys 分类对象数组
     */
    initCascaderOptions = async (categorys) => {
        // 进行数据转换
        const cascaderOptions = categorys.map(c => {
            return {
                value: c._id,
                label: c.name,
                isLeaf: false,
            }
        })

        // 如果是一个二级分类商品的更新
        const { isUpdate, product } = this.state;
        const { pCategoryId } = product;

        if (isUpdate && pCategoryId !== "0") {
            // 获取对应的二级分类列表
            const subCategorys = await this.getCatergorys(pCategoryId);
            // 生成二级下拉列表的options
            const childOptions = subCategorys.map(c => {
                return {
                    value: c._id,
                    label: c.name,
                    isLeaf: true,
                }
            })
            //关联到当前option上
            const targetOptions = cascaderOptions.find(option => {
                return option.value === pCategoryId;
            })
            targetOptions.children = childOptions;
        }

        // 更新cascaderOptions
        this.setState({ cascaderOptions });
    }

    componentDidMount() {
        // 从props.location.state中获取对象(添加：没有值， 更新：有值)
        const product = this.props.location.state;
        // 保存是否是更新的标识,保存product,如果没有保存空对象
        this.setState({
            isUpdate: !!product,
            product: product || {}
        }, () => {
            // 初始化获取分类列表
            this.getCatergorys("0");
        });
    }

    render() {
        // 当前是添加/修改商品
        const { isUpdate, product } = this.state;

        // card左上角标题
        const cardTitle = (
            <div>
                <LinkButton onClick={this.handleBackOnClick}>
                    <ArrowLeftOutlined style={{ color: "green", fontSize: "20px" }} />
                </LinkButton>
                <span style={{ margin: "0 15px" }}>{isUpdate ? "修改商品" : "添加商品"}</span>
            </div>
        )

        // 商品分类多选框相关数据
        const { cascaderOptions } = this.state;
        const categoryIds = [];   // 用来接收级联分类ID的数组

        // 进行数据处理
        if (isUpdate) {
            const { pCategoryId, category } = product;
            // 如果是一级分类的商品
            if (pCategoryId === "0") {
                categoryIds.push(category);
            } else {
                // 如果是二级分类的商品
                categoryIds.push(pCategoryId);
                categoryIds.push(category);
            }
        }

        // 图片相关数据
        const { imgs } = product;

        return (
            <Card title={cardTitle} className="product-addUpdate" >
                <Form
                    labelCol={{ span: 2, }}
                    wrapperCol={{ span: 8, }}
                    onFinish={this.handleOnFinish}
                >

                    <Form.Item
                        label="商品名称："
                        name="productName"
                        initialValue={product.name}
                        rules={[{ required: true, message: '必须输入商品名称！' }]}
                    >
                        <Input placeholder="请输入商品名称" />
                    </Form.Item>

                    <Form.Item
                        label="商品描述："
                        name="productDesc"
                        initialValue={product.desc}
                        rules={[{ required: true, message: '必须输入商品描述！' }]}
                    >
                        <Input.TextArea
                            placeholder="请输入商品描述"
                            autoSize={{ minRows: 2, maxRows: 6 }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="商品价格："
                        name="productPrice"
                        initialValue={product.price}
                        rules={[{ required: true, message: '必须输入商品价格！' },
                        { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: "请输入正确的金额！" }]}
                    >
                        <Input
                            placeholder="请输入商品价格"
                            type="number"
                            addonAfter="元"
                        />
                    </Form.Item>

                    <Form.Item
                        label="商品分类："
                        name="categoryIds"
                        initialValue={categoryIds}
                        rules={[{ required: true, message: '必须指定商品分类！' }]}
                    >
                        <Cascader
                            placeholder="请选择商品分类"
                            options={cascaderOptions}          /**需要显示的列表数据 */
                            loadData={this.handleLoadData}     /**选择列表项后，加载下一级列表的监听回调 */
                        />
                    </Form.Item>

                    <Form.Item label="商品图片：">
                        <PictureWall ref={this.pictureWallRef} imgs={imgs} />
                    </Form.Item>

                    <Form.Item label="商品详情：">
                        <div>商品详情</div>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card >
        )
    }
}
