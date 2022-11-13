import React, { Component } from "react";
import Main from "./components/MainComponent";
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {ConfigureStore} from './redux/configureStore';

const store = ConfigureStore();

class App extends Component {


  render() {
    return (
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <div className="App">
              <Main />
            </div>
          </BrowserRouter>
        </Provider>
      </React.StrictMode>
    );
  }
}

export default App