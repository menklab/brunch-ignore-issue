'use strict';

import React from 'react';
import {requestPage} from '../../config/actions/page'
import {connect} from 'react-redux'
import HeroImage from '../../components/heroImage/HeroImage'
import ClassroomDetails from './components/classroomDetails/ClassroomDetails'
import ClassroomGallery from './components/classroomGallery/ClassroomGallery'
import CalloutBox from '../../components/calloutBox/CalloutBox'
import Divider from '../../components/divider/Divider'
import ContactForm from '../../components/contactForm/ContactForm'
import ThreeBoxCallout from '../../components/threeBoxCallout/ThreeBoxCallout'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class ClassRoomPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

    }


    componentWillMount() {
        this.props.requestPage(this.props.path);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.path != this.props.path) {
            this.props.requestPage(nextProps.path);
        }

        if (this.props.content != nextProps.content) {
            this.setState = {
                newContent: nextProps.content
            };
        }
    }


    render() {

        let html = getHtmlFromData(this.props.content);

        return (
            html
        );
    }
}


function getHtmlFromData(c) {
    if (!c) {
        return null;
    }
    let mainContentList = [];
    for (var i = 0; i < c.classroomDetails.mainContent.list.length; i++) {
        mainContentList.push(<li key={i}>{c.classroomDetails.mainContent.list[i]}</li>);
    }

    let html =
        <div className="content-page-transition">
            <HeroImage className="hero-wrapper-classes" height={c.topHero.backgroundImage.height}
                       backgroundImage={c.topHero.backgroundImage.src}/>
            <ClassroomDetails>
                <div className="container container-no-padding">
                    <div className="classroom-details-left-col">
                        <div className="callout-box-wrapper">
                            <CalloutBox className="callout-box-classroom-cta">
                                <div className="callout-box-classroom-icon-wrapper">
                                    <div className="callout-box-classroom-icon"
                                         style={{"backgroundImage": `url(${c.classroomDetails.calloutBox.icon.src})`}}>
                                    </div>
                                </div>
                                <h1>{c.classroomDetails.calloutBox.title}</h1>
                                <h2>{c.classroomDetails.calloutBox.subTitle}</h2>
                                <p>{c.classroomDetails.calloutBox.content}</p>
                                <Divider />
                                <ContactForm className="contact-form-wrapper-classroom-cta"/>
                            </CalloutBox>
                        </div>
                    </div>
                    <div className="classroom-details-right-col">
                        <div className="wrapper-classroom-details">
                            <h1>{c.classroomDetails.mainContent.title}</h1>
                            <p>{c.classroomDetails.mainContent.content}</p>
                            <ul>
                                {mainContentList}
                            </ul>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className="container container-no-padding">
                    <div className="teacher-bio-classroom-wrapper">
                        <h1>{c.threeBoxCallout.title}</h1>

                        <ThreeBoxCallout className="three-box-callout-classroom" height="326px">
                            <CalloutBox
                                className="three-box-callout-box three-box-callout-box-classroom three-box-callout-box-left">
                                <h2>{c.threeBoxCallout.box1.title}</h2>
                                <img src={c.threeBoxCallout.box1.image.src} alt={c.threeBoxCallout.box1.image.alt}/>
                                <p>{c.threeBoxCallout.box1.text}</p>
                            </CalloutBox>
                            <CalloutBox
                                className="three-box-callout-box three-box-callout-box-classroom three-box-callout-box-center">
                                <h2>{c.threeBoxCallout.box2.title}</h2>
                                <img src={c.threeBoxCallout.box2.image.src} alt={c.threeBoxCallout.box2.image.alt}/>
                                <p>{c.threeBoxCallout.box2.text}</p>
                            </CalloutBox>
                            <CalloutBox
                                className="three-box-callout-box three-box-callout-box-classroom three-box-callout-box-right">
                                <h2>{c.threeBoxCallout.box3.title}</h2>
                                <img src={c.threeBoxCallout.box3.image.src} alt={c.threeBoxCallout.box3.image.alt}/>
                                <p>{c.threeBoxCallout.box3.text}</p>
                            </CalloutBox>
                        </ThreeBoxCallout>
                    </div>
                </div>
            </ClassroomDetails>
            <ClassroomGallery images={c.gallery.images}>
                <div className="container container-no-padding">
                    <h1>{c.gallery.title}</h1>
                </div>
            </ClassroomGallery>
        </ div >;

    return html;
}

function mapStateToProps(state, ownProps) {
    let content = null;
    let path = ownProps.location.pathname;
    let page = state.page[path];
    if (!!page && !!page.content) {
        content = page.content;
    }
    return {
        content: content,
        path: path
    }
}

export default connect(mapStateToProps, {
    requestPage
})(ClassRoomPage);