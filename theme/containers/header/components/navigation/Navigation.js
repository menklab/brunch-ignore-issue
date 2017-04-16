'use strict';

import React from 'react';
import Logo from '../logo/Logo'
import NavigationItemBasic from '../navigationItemBasic/NavigationItemBasic'
import NavigationItemPrograms from '../navigationItemPrograms/NavigationItemPrograms'

class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (
            <div className="container-fluid container-fluid-no-padding">
                <div className="row row-centered">
                    <div className="col-md-12 col-centered col-no-padding">
                        <div className="container container-no-padding">
                            <div className="wrapper-logo hidden-sm">
                                <Logo />
                            </div>
                            <div className="wrapper-navigation">
                                <nav>
                                    <NavigationItemBasic pos="0" title="About Us" uri="javascript:void(0)"/>
                                    <NavigationItemPrograms title="Programs" uri="javascript:void(0)"/>
                                    <NavigationItemBasic title="Videos" uri="javascript:void(0)"/>
                                    <NavigationItemBasic title="Parent Resources" uri="javascript:void(0)"/>
                                    <NavigationItemBasic title="Contact" uri="javascript:void(0)"/>
                                    <NavigationItemBasic title="Sign In" uri="javascript:void(0)"/>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
            ;
    }


}

export default Navigation;