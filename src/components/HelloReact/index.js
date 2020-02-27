import React, { PureComponent, Component } from "react";
// import PropTypes from "prop-types";
// import { Component } from "react";

// import * as styles from "./styles.scss";
import store from "../../redux/store";
import { SEARCH_REPO, SEARCH_DATA_STORAGE } from "../../actions/ActionTypes";
import { request, generalSaveAction } from "../../actions/ServiceAction";
import constant from "../../constant";
import HttpServiceManager from "../../service/HttpServiceManager";
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import { connect } from "react-redux";

class HelloReact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // repo: [
            //     {
            //         id: 1,
            //         name: "Wasif",
            //         owner: 21,
            //         star: "wasif@email.com",
            //         date: "18-19-2929"
            //     },
            //     {
            //         id: 2,
            //         name: "Ali",
            //         owner: 19,
            //         star: "ali@email.com",
            //         date: "18-19-2929"
            //     }
            // ],
            value: "",
            setList: []
        };
    }

    componentDidMount() {
        console.log("componentDidMount chala ");
        HttpServiceManager.initialize(constant.baseURL, {
            Authorization: 'Access-Control-Allow-Origin", "*"'
        });
    }

    // searchHandler = value => {
    //     store.dispatch(
    //         request(
    //             `${constant.SEARCH_REPO}react+native+splash+screen`,
    //             "get",
    //             {},
    //             SEARCH_REPO,
    //             true,
    //             () => {
    //                 // alert("success");
    //             },
    //             () => {
    //                 alert("falil");
    //             }
    //         )
    //     );
    // };

    searchHandler = (value, storeData) => {
        var refectorValue = value.replace(/[^A-Z0-9]+/gi, "+");
        if (refectorValue[0] === "+") {
            console.log("1 ");
            refectorValue = refectorValue.slice(1);
        }
        if (refectorValue.indexOf("+") != -1) {
            console.log("2 ");
            if (storeData[refectorValue]) {
                // this.setState({ setList(storeData[refectorValue])});
                this.setState({ setList: storeData[refectorValue] });
            } else {
                console.log("3  dispatch");
                store.dispatch(
                    request(
                        `${constant.SEARCH_REPO}${refectorValue}`,
                        "get",
                        {},
                        SEARCH_REPO,
                        true,
                        res => {
                            this.searchSuccess(
                                res.data.items,
                                this.state.setList,
                                refectorValue
                            );
                        },
                        () => {}
                    )
                );
            }
        }
    };
    searchSuccess = (data, setList, key) => {
        store.dispatch(
            generalSaveAction(SEARCH_DATA_STORAGE.ADD_OBJECT, { [key]: data })
        );
        this.setState({ setList: data });
        // setList(data);
    };

    render() {
        const { searchDataStorage } = this.props;
        const { setList } = this.state;
        console.log("dekjekjk : ", searchDataStorage, " setList : ", setList);
        // const owner = setList.owner.login;
        // console.log("cehck  : ", owner);

        return (
            <div>
                <form action="javasscript:void(0)">
                    <label>
                        Search Repo :
                        <input
                            type="text"
                            name="name"
                            value={this.state.value}
                            onChange={text => {
                                this.setState({ value: text.target.value });
                            }}
                        />
                    </label>
                    <button
                        onClick={() => {
                            const { value } = this.state;
                            this.searchHandler(value, searchDataStorage);
                        }}
                    >
                        {" "}
                        Search{" "}
                    </button>
                </form>

                <BootstrapTable
                    data={this.state.setList}
                    bordered
                    striped
                    hover
                    condensed
                >
                    <TableHeaderColumn
                        dataField="id"
                        isKey={true}
                        className="id"
                    >
                        ID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="name" className="name">
                        Repo Title
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="owner"
                        dataFormat={(cell, row) => {
                            return row.owner.login;
                        }}
                    >
                        Owner
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="star">
                        Stars
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="created_at"
                        dataFormat={(cell, row) => {
                            // return row.created_at;
                            return new Date(
                                row.created_at
                            ).toLocaleDateString();
                        }}
                    >
                        Created at
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

// export default HelloReact;

const actions = {};
const mapStateToProps = ({ searchDataStorage }) => {
    return {
        searchDataStorage: searchDataStorage.data
    };
};

export default connect(mapStateToProps, actions)(HelloReact);
