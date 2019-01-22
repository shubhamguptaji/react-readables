import React, { Component } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import FrontPage from "./Components/FrontPage";
import reduxThunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <FrontPage />
      </Provider>
    );
  }
}

export default App;
