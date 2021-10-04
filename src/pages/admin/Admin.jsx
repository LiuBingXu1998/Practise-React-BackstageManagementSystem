import React, { Component } from 'react';
import { Redirect } from 'react-router';

import memoryUtils from '../../utils/memoryUtils';

/**
 * 管理的路由组件
 */
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user;
        
        // 如果内存没有存储user ==> 当前未登录，跳转登录页面
        if(!user || !user._id) {
            return <Redirect to="/login"/>
        }

        return (
            <div>
                Admin...{user.username}
            </div>
        )
    }
}
