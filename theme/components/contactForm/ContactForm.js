'use strict';

import React from 'react';
import {connect} from 'react-redux';


class HeroImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        var partialState = {};
        partialState[name] = value;
        this.setState(partialState);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Name: " + this.state.name + ", Email: " + this.state.email);
    }


    componentDidMount() {
    }

    render() {
        return (
            <div className={`contact-form-wrapper ${this.props.className}`}>
                <form className="form" onSubmit={this.handleSubmit} noValidate>
                    <label className="label label-default">Your Name</label>
                    <input className="input input-default" name="name" type="text" required onChange={this.handleInputChange}/>

                    <label className="label label-default">Email</label>
                    <input className="input input-default" name="email" type="email" required onChange={this.handleInputChange}/>

                    <input className="input btn btn-primary" type="submit" value="Send request" />
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {})(HeroImage);