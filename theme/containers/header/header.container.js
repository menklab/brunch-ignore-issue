'use strict';

import React from 'react';
import {connect} from 'react-redux'
import MessageBar from './components/messageBar/MessageBar'
import Navigation from './components/navigation/Navigation'


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="wrapper-header">
                    <MessageBar
                        message={{__html: "Parents Notification: December 13 is Christmas pictures&nbsp;&nbsp;&nbsp;&nbsp;  <a href=''>Details</a>"}}
                    />
                    <Navigation/>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {})(Header);