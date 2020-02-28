import React, { Component } from "react";
import store from "../../redux/store";
import { SEARCH_REPO, SEARCH_DATA_STORAGE } from "../../actions/ActionTypes";
import { request, generalSaveAction } from "../../actions/ServiceAction";
import constant from "../../constant";
import HttpServiceManager from "../../service/HttpServiceManager";
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";

class HelloReact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            setList: []
        };
    }

    componentDidMount() {
        HttpServiceManager.initialize(constant.baseURL, {
            Authorization: 'Access-Control-Allow-Origin", "*"'
        });
    }

    searchHandler = value => {
        let localstoreData = localStorage.getItem("repoStorage");
        var refectorValue = value.replace(/[^A-Z0-9]+/gi, "+");
        if (refectorValue[0] === "+") {
            refectorValue = refectorValue.slice(1);
        }
        if (refectorValue.indexOf("+") != -1) {
            if (localstoreData && JSON.parse(localstoreData)[refectorValue]) {
                this.setState({
                    setList: JSON.parse(localstoreData)[refectorValue]
                });
            } else {
                store.dispatch(
                    request(
                        `${constant.SEARCH_REPO}${refectorValue}`,
                        "get",
                        {},
                        SEARCH_REPO,
                        true,
                        res => {
                            this.searchSuccess(res.data.items, refectorValue);
                        },
                        () => {}
                    )
                );
            }
        }
    };
    searchSuccess = (data, key) => {
        store.dispatch(
            generalSaveAction(SEARCH_DATA_STORAGE.ADD_OBJECT, { [key]: data })
        );
        this.setState({ setList: data });
        let localstoreData = localStorage.getItem("repoStorage");
        if (JSON.parse(localstoreData)) {
            localStorage.setItem(
                "repoStorage",
                JSON.stringify(
                    Object.assign({}, JSON.parse(localstoreData), {
                        [key]: data
                    })
                )
            );
        } else {
            localStorage.setItem(
                "repoStorage",
                JSON.stringify({ [key]: data })
            );
        }
    };

    render() {
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
                            this.searchHandler(value);
                        }}
                    >
                        Search
                    </button>
                </form>

                <BootstrapTable
                    data={this.state.setList}
                    bordered
                    striped
                    hover
                    condensed
                    pagination
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

export default HelloReact;
