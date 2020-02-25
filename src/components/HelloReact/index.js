import React, { PureComponent, Component } from "react";
import PropTypes from "prop-types";
// import { Component } from "react";

// import * as styles from "./styles.scss";

class HelloReact extends Component {
    static propTypes = {
        state: PropTypes.string
    };
    static defaultProps = {
        state: ""
    };
    render() {
        const { state } = this.props;
        // return <div className={styles["title"]}>{state}</div>;
        return (
            <div>
                <h1>hello world</h1>
            </div>
        );
    }
}

export default HelloReact;
