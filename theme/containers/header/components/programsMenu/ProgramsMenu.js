'use strict';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ProgramsMenuItem from '../programsMenuItem/ProgramsMenuItem'
import ProgramsMenuItemBasic from '../programsMenuItemBasic/ProgramsMenuItemBasic'


class ProgramsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({open: nextProps.open});
    }

    render() {
        let programsMenu = null;
        let programMenuDivide = null;


        if (this.state.open) {
            programMenuDivide =
                <span className="program-navigation-item-divide">
                        </span>;

            programsMenu =
                <div className="programs-menu container">
                    <div className="program-menu-left-1-col">
                        <ProgramsMenuItem icon="/themes/bslf/img/icons/lamb.jpg" title="Lovable Lambs"
                                          uri="/classes/lovable-lambs" details="6w to 9m" onMenuItemSelected={this.props.onMenuItemSelected}/>
                        <ProgramsMenuItem icon="/themes/bslf/img/icons/giraffe.jpg" title="Gentle Giraffes"
                                          uri="/classes/gentle-giraffes" details="10m to 18m" onMenuItemSelected={this.props.onMenuItemSelected}/>
                        <ProgramsMenuItem icon="/themes/bslf/img/icons/critter.jpg" title="Curious Critters"
                                          uri="/classes/curious-critters" details="18m to 2yrs" onMenuItemSelected={this.props.onMenuItemSelected}/>
                        <ProgramsMenuItem icon="/themes/bslf/img/icons/hippo.jpg" title="Helpful Hippos"
                                          uri="/classes/helpful-hippos" details="2yrs to 2.5yrs" onMenuItemSelected={this.props.onMenuItemSelected}/>
                        <ProgramsMenuItem icon="/themes/bslf/img/icons/chipmunk.jpg" title="Cheerful Chipmunks"
                                          uri="/classes/cheerful-chipmunks" details="2.5yrs to 3yrs" onMenuItemSelected={this.props.onMenuItemSelected}/>
                    </div>
                    <div className="program-menu-left-2-col">
                        <ProgramsMenuItem icon="/themes/bslf/img/icons/turtle.jpg" title="Trustworthy Turtles"
                                          uri="/classes/trustworthy-turtles" details="3yrs to 3.5yrs" onMenuItemSelected={this.props.onMenuItemSelected}/>
                        <ProgramsMenuItem icon="/themes/bslf/img/icons/cub.jpg" title="Courageous Cubs"
                                          uri="/classes/courageous-cubs" details="3.5yrs to 4yrs" onMenuItemSelected={this.props.onMenuItemSelected}/>
                        <ProgramsMenuItem icon="/themes/bslf/img/icons/frog.jpg" title="Friendly Frogs"
                                          uri="/classes/friendly-frogs" details="4yrs to 5yrs" onMenuItemSelected={this.props.onMenuItemSelected}/>
                        <ProgramsMenuItem icon="/themes/bslf/img/icons/raccoon.jpg" title="Responsible Racoons"
                                          uri="/classes/responsible-raccoons" details="5yrs to 6yrs" onMenuItemSelected={this.props.onMenuItemSelected}/>
                        <ProgramsMenuItem icon="/themes/bslf/img/icons/cool.jpg" title="Cool Kids"
                                          uri="/classes/cool-kids" details="6yrs to 12yrs" onMenuItemSelected={this.props.onMenuItemSelected}/>
                    </div>
                    <div className="program-menu-divide">
                    </div>

                    <div className="program-menu-right-col">
                        <ProgramsMenuItemBasic title="Tuition" uri="javascript:void(0)" onMenuItemSelected={this.props.onMenuItemSelected}/>
                        <ProgramsMenuItemBasic title="Field Trips" uri="javascript:void(0)" onMenuItemSelected={this.props.onMenuItemSelected}/>
                        <ProgramsMenuItemBasic title="Sample Lesson Plan" uri="javascript:void(0)" onMenuItemSelected={this.props.onMenuItemSelected}/>
                        <ProgramsMenuItemBasic title="Monthly Themes" uri="javascript:void(0)" onMenuItemSelected={this.props.onMenuItemSelected}/>
                        <ProgramsMenuItemBasic title="Sample Daily Food Menu" uri="javascript:void(0)" onMenuItemSelected={this.props.onMenuItemSelected}/>
                    </div>
                </div>
            ;
        }

        return (
            <div className="wrapper-program-menu">
                <ReactCSSTransitionGroup transitionName="programs-menu-divide-transition"
                                         transitionEnterTimeout={50}
                                         transitionLeaveTimeout={550}>
                    {programMenuDivide}
                </ReactCSSTransitionGroup>

                <ReactCSSTransitionGroup transitionName="programs-menu-transition"
                                         transitionEnterTimeout={550}
                                         transitionLeaveTimeout={500}>
                    {programsMenu}
                </ReactCSSTransitionGroup>
            </div>
        );
    }


}

export default ProgramsMenu;