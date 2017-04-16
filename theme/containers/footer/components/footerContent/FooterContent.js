'use strict';

import React from 'react';

class FooterContent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <div className="container-fluid container-fluid-no-padding">
                <div className="footer-content-wrapper container">
                    <div className="footer-col footer-col-left">
                        <h3>About Us</h3>
                        <hr />
                        <h3 className="footer-h3-top-margin-helper">Videos</h3>
                        <hr />
                        <h3 className="footer-h3-top-margin-helper">Parent Resources</h3>
                        <hr />
                        <h5>Home Resources</h5>
                        <h5 className="footer-h5-top-margin-helper">Sign In</h5>
                        <div className="footer-ss-wrapper">
                            <a className="footer-ss-facebook" href="#"><i className="icon-facebook"/></a>
                            <a className="footer-ss-twitter" href="#"><i className="icon-twitter"/></a>
                        </div>

                    </div>
                    <div className="footer-col footer-col-center">
                        <h3>Programs</h3>
                        <hr/>
                        <div className="row">
                            <div className="col-md-6 col-no-padding">
                                <h5>Lovable Lambs (6w to 9m)</h5>
                                <h5 className="footer-h5-top-margin-helper">Gentle Giraffes (10m to 18m)</h5>
                                <h5 className="footer-h5-top-margin-helper">Curious Critters (18m to 2yrs)</h5>
                                <h5 className="footer-h5-top-margin-helper">Helpful Hippos (2yrs to 2.5yrs)</h5>
                                <h5 className="footer-h5-top-margin-helper">Cheerful Chipmunks (2.5yrs to
                                    3yrs)</h5>
                                <h5 className="footer-h5-top-margin-helper">Trustworthy Turtles (3yrs to
                                    3.5yrs)</h5>
                            </div>
                            <div className="col-md-6 col-no-padding">
                                <h5>Courageous Cubs (3.5yrs to 4yrs)</h5>
                                <h5 className="footer-h5-top-margin-helper">Friendly Frogs (4yrs to 5yrs)</h5>
                                <h5 className="footer-h5-top-margin-helper">Responsible Raccoons (5yrs to
                                    6yrs)</h5>
                                <h5 className="footer-h5-top-margin-helper">Cool Kids (6yrs to 12yrs)</h5>
                                <h5 className="footer-h5-top-margin-helper">&nbsp;</h5>
                                <h5 className="footer-h5-top-margin-helper">Tuition</h5>
                            </div>
                        </div>
                            <div className="footer-email-signup-wrapper">
                                <form className="form">
                                    <label className="label label-default">Sign up for our email newsletter</label>
                                    <input className="input input-default" type="email"/>
                                    <input className="input btn btn-primary footer-email-input-btn" type="submit" value="Sign Up"/>
                                </form>
                        </div>
                    </div>
                    <div className="footer-col footer-col-right">
                        <h3>Contact</h3>
                        <hr/>
                        <h5>Phone: (616) 682-8300</h5>
                        <h5 className="footer-h5-top-margin-helper">Email: info@bigstepslittlefeet.org</h5>
                        <h5 className="footer-h5-top-margin-helper">Address: 7030 Fulton St. Ada, MI 49301</h5>
                        <div className="footer-map-wrapper">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2919.9407402596225!2d-85.4971091841021!3d42.95845320509279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x881851bc853af87b%3A0xbdf929db1d60d271!2sBig+Steps+Little+Feet!5e0!3m2!1sen!2sus!4v1490550243779"
                                width="358"
                                height="183"
                                frameBorder="0"
                                style={{border: "0"}}
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default FooterContent;