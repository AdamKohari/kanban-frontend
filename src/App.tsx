import React from 'react';
import './App.scss';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Board from "./components/board/Board";
import TopBar from "./shared-components/top-bar/TopBar";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Manager from "./components/manager/Manager";

function App() {
    return (
        <div className="app-div">
            <ToastContainer />
            <BrowserRouter>
                <Switch>
                    <Route path="//">
                        <Login />
                    </Route>

                    <Route path="/register">
                        <Register />
                    </Route>

                    <Route path="/board/:id">
                        <TopBar place="BOARD" />
                        <Board />
                    </Route>

                    <Route path="/manager">
                        <TopBar place="MANAGER" />
                        <Manager />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
