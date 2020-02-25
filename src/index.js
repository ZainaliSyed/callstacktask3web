// import "core-js/shim";
// import "regenerator-runtime/runtime";

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

// import store from "redux/store";
// import HelloReact from "containers/HelloReact";
import store from "./redux/store";
// import HelloReact from "./containers/HelloReact";
import HelloReact from "./components/HelloReact";

// componentDidMount() {
//     //   console.log()
//     HttpServiceManager.initialize(constant.baseURL, {
//       token: constant.applicationToken,
//     });
//     //set designedAtX verify it on Adobe XD Desgin file
//     //Metrics.designedAtX = false;
//   }

render(
    <Provider store={store}>
        <div>
            <h1>Hello, world!</h1>
            <HelloReact />
        </div>
    </Provider>,
    document.getElementById("root")
);
