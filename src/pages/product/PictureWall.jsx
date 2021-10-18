import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { reqDeleteImg } from "../../api/index";
import { BASE_IMG_URL } from "../../utils/constants"

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PictureWall extends Component {
    state = {
        previewVisible: false,   // 控制Modal隐藏/显示
        previewImage: '',        // 大图片的URL
        previewTitle: '',        // 大图片的标题
        fileList: [],
    };

    static propTypes = {
        imgs: PropTypes.array,
    }

    /**
     * 监听Modal取消事件:隐藏Modal
     */
    handleCancel = () => {
        this.setState({ previewVisible: false });
    };

    /**
     * 监听点击事件，显示文件对应的大图
     * @param {Object} file 图片文件对象(自动传入)
     */
    handlePreview = async file => {
        // 对图片进行压缩
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    /**
     * 监听文件列表改变事件
     * @param {Object} file 当前操作的图片
     * @param {Array} fileList 所有已上传图片的数组(自动传入)
     */
    handleChange = async ({ file, fileList }) => {
        // 上传成功的操作
        if (file.status === "done") {

            const result = file.response;
            if (result.status === 0) {
                message.success("上传图片成功！");

                const { name, url } = result.data;
                file.name = name;
                file.url = url;
            } else {
                message.error("上传图片失败！");
            }
        } else if (file.status === "removed") { // 删除图片
            const result = await reqDeleteImg(file.name);
            if (result.status === 0) {
                message.success("删除图片成功！");
            } else {
                message.error("删除图片失败！");
            }
        }

        // 更新列表
        this.setState({ fileList });
    }

    /**
     * 获取所有已上传图片文件名的数组
     * @returns {Array} 文件名的数组 
     */
    getImgs = () => {
        return this.state.fileList.map(file => file.name)
    }

    componentDidMount() {
        let fileList = [];
        const { imgs } = this.props;

        if (imgs && imgs.length > 0) {
            fileList = imgs.map((img, index) => {
                return {
                    uid: -index,
                    name: img,
                    status: "done",
                    url: BASE_IMG_URL + img,
                }
            })
        }

        this.setState({ fileList });
    }

    render() {
        // 从state中获取的数据
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;

        // 上传按钮
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>添加图片</div>
            </div>
        );

        return (
            <div>
                <Upload
                    action="/manage/img/upload"        // 上传图片接口地址
                    name="image"                       // 请求的参数名
                    accept="image/*"                   // 接收的文件类型
                    listType="picture-card"            // 图片展示的样式
                    fileList={fileList}                // 已上传文件的列表
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>

                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="显示的图片" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
};