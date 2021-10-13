import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import ProductHome from "./ProductHome";
import ProductAddUpdate from "./ProductAddUpdate";
import ProductDetail from "./ProductDetail";
/**
 * 商品管理路由组件
 */
export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path="/admin/product/home" component={ProductHome}></Route>
                <Route path="/admin/product/addUpdate" component={ProductAddUpdate}></Route>
                <Route path="/admin/product/detail" component={ProductDetail}></Route>
                <Redirect to="/admin/product/home" />
            </Switch>
        )
    }
}
