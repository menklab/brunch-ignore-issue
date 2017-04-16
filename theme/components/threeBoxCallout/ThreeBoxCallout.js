'use strict';

import React from 'react';
import {connect} from 'react-redux'
import HeroImage from '../heroImage/HeroImage'
import CalloutBox from '../calloutBox/CalloutBox'


class ThreeBoxCallout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        let height = this.props.height;
        if (height == "") {
            height = "329px";
        }
        return (
            <div className={this.props.className}>
                <HeroImage height={height} backgroundImage="/themes/bslf/img/home/hero-pattern-bg.png"
                           backgroundColor="#2CAFC1" backgroundSize="auto 329px" backgroundRepeat="repeat-x">
                        <div className='three-box-callout-box-wrapper container'>
                            {this.props.children}
                        </div>
                </HeroImage>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {})(ThreeBoxCallout);