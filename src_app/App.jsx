import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/login/Login';
import Admin from './pages/admin/Admin';


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {/* 注册路由 */}
                    <Route path="/login" component={Login}></Route>
                    <Route path="/admin" component={Admin}></Route>
                    <Redirect to="/login" />
                </Switch>
            </BrowserRouter>
        )
    }
}
