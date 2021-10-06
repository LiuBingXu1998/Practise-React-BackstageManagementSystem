import React, { Component } from 'react';

import "./LinkButton.less";

/**
 * 长得像link标签的按钮
 */
export default class LinkButton extends Component {
    render() {
        return (
            <button className="linkButton" {...this.props}>{this.props.children}</button>
        )
    }
}
