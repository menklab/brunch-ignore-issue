import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Header from '../containers/header/header.container'
import Footer from '../containers/footer/footer.container'


class DefaultTemplate extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let loaderStyle = document.getElementById("loader-page-wrapper").style;
        let appStyle = document.getElementById("app").style;
        appStyle.overflowY = "hidden";
        // wait for entire dom to finish and then fade loading screen.
        window.onload = function () {
            setTimeout(function () {
                loaderStyle.opacity = 0;

                // after fade start we can fade in actual site
                setTimeout(function () {
                    appStyle.overflowY = "";
                    setTimeout(function () {
                        appStyle.opacity = 1;
                    }, 250);
                }, 500);
                // once loading screen is completely gone we can remove it from dom view
                setTimeout(function () {
                    loaderStyle.display = "none";
                }, 750);
            }, 250);
        }
    }

    render() {
        return (
            <div>
            <div className="hidden-xs hidden-sm">
                <Header />
                <div className="container-fluid container-fluid-no-padding">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
                <div className="hidden-md hidden-lg">
                    <h1>Mobile Site Not Created.</h1>
                </div>
            </div>
        )
    }
}

DefaultTemplate.propTypes = {
    children: PropTypes.node
};

function mapStateToProps(state, ownProps) {
    return {}
}

export default connect(mapStateToProps, {})(DefaultTemplate)