import React, { Component } from 'react';
import PropTypes from "prop-types";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class RichTextEditor extends Component {
    state = {
        editorState: EditorState.createEmpty(), // 创建一个没有内容的编辑对象
    }

    static propTypes = {
        detail: PropTypes.string,
    }

    /**
     * 监听输入过程中的实时调用
     * @param {Object} editorState 实时对象(自动传入)
     */
    onEditorStateChange = (editorState) => {
        this.setState({ editorState, });
    };

    /**
     * 监听图片文件上传
     * @param {} file 图片文件
     * @returns Promise 对象
     */
    uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', "/manage/img/upload");
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    const url = response.data.url;      // 获取图片的url           
                    resolve({ data: { link: url } });
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }

    /**
     * 获取商品详情数据
     * @returns Detail 数据
     */
    getDetail = () => {
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    }

    /**
     * 获取输入框内的数据
     */
    getData = () => {
        const html = this.props.detail;
        if (html) {
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.setState({ editorState });
            }
        }
    }

    componentDidMount() {
        setTimeout(this.getData, 0);
    }

    render() {
        const { editorState } = this.state;

        return (
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                editorStyle={{ border: "1px solid black", minHeight: "200px", padding: "10px" }}
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                    image: {
                        uploadCallback: this.uploadImageCallBack,
                        alt: { present: true, mandatory: true }
                    },
                }}
            />
        );
    }
}
