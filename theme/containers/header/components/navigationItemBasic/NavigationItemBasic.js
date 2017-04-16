'use strict';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class NavigationItemBasic extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.classNameDefualt =  "navigation-item";
        this.className = this.classNameDefualt;
    }

    componentWillReceiveProps(nextProps) {
    }

    onClick(e) {
        e.stopPropagation();
        e.preventDefault();
        if (!! this.props.onClick) {
            this.props.onClick(e)
        }
    }


    render() {


        if (this.props.pos == 0) {
            this.className = this.classNameDefualt + " navigation-item-first"
        }

        return (
            <a className={this.className} href={this.props.uri} onClick={this.onClick} >{this.props.title}
                <i className="icon-arrow-down color-orange"/>
            </a>
        );
    }


}

export default NavigationItemBasic;