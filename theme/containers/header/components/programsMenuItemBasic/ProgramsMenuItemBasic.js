'use strict';

import React from 'react';
import {Link} from 'react-router';

class ProgramsMenuItemBasic extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <Link to={this.props.uri} onClick={this.props.onMenuItemSelected}>
                <h2 className="programs-menu-item-basic-title hover-animate-zoom"><span className="color-orange"> <i
                    className="icon-arrow-right programs-menu-item-basic-title-icon-padding"/></span>{this.props.title}
                </h2>
            </Link>
        );
    }


}

export default ProgramsMenuItemBasic;