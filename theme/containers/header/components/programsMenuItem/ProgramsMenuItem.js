'use strict';

import React from 'react';
import {Link} from 'react-router';

class ProgramsMenuItem extends React.Component {
    constructor(props) {
        super(props);
    }




    render() {

        return (
            <Link to={this.props.uri} onClick={this.props.onMenuItemSelected}>
                <div className="program-menu-item-wrapper hover-animate-zoom">
                    <div className="program-menu-item-icon-wrapper">
                        <span className="vertical-center-helper"/>
                        <img className="program-menu-item-icon" src={this.props.icon}
                             alt={'Icon image for ' + this.props.title}/>
                    </div>
                    <div className="program-menu-item-copy-wrapper">
                        <h2 className="program-menu-item-title">{this.props.title}</h2>
                        <h3 className="program-menu-item-details">{this.props.details}</h3>
                    </div>
                </div>
            </Link>
        );
    }


}

export default ProgramsMenuItem;