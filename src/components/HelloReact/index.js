import React, { PureComponent, Component } from "react";
// import PropTypes from "prop-types";
// import { Component } from "react";

// import * as styles from "./styles.scss";
import store from "../../redux/store";
import { SEARCH_REPO } from "../../actions/ActionTypes";
import { request } from "../../actions/ServiceAction";
import constant from "../../constant";
import HttpServiceManager from "../../service/HttpServiceManager";

class HelloReact extends Component {
    // static propTypes = {
    //     state: PropTypes.string
    // };
    // static defaultProps = {
    //     state: ""
    // };

    componentDidMount() {
        console.log("componentDidMount chala ");
        HttpServiceManager.initialize(constant.baseURL, {
            // token: constant.applicationToken
        });
    }

    searchHandler = value => {
        store.dispatch(
            request(
                `${constant.SEARCH_REPO}react+native+splash+screen`,
                "get",
                {},
                SEARCH_REPO,
                true,
                () => {
                    alert("success");
                },
                () => {
                    alert("falil");
                }
            )
        );
    };

    render() {
        const { state } = this.props;
        console.log("store check : ", store);
        // return <div className={styles["title"]}>{state}</div>;
        return (
            <div>
                <h1>hello world</h1>
                <button
                    onClick={() => {
                        // alert("show me ");
                        this.searchHandler();
                    }}
                >
                    {" "}
                    click me{" "}
                </button>
            </div>
        );
    }
}

export default HelloReact;
