import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {configureStore, runSaga} from "./redux/store";
import {defineCustomElements} from "kanban-table-project-details";

const store = configureStore();
runSaga();

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

defineCustomElements();
reportWebVitals();
