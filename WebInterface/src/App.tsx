import React, { Component, ReactNode } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './Components/Auth/Register';
import BoardIndex from './Components/BoardIndex/BoardIndex';
import Footer from './Components/Layout/Footer';
import Header from './Components/Layout/Header';
import Login from './Containers/Auth/Login';
import Logout from './Containers/Auth/Logout';
import Menu from './Containers/Layout/Menu';
import environment from './environment';

class App extends Component {
    public render(): ReactNode {
        return (
            <div>
                <BrowserRouter>
                    <Header forumTitle={environment.forumTitle} />
                    <Menu />
                    <div className="app-wrapper">
                        <div className="app">
                            <main>
                                <Switch>
                                    <Route path="/login">
                                        <Login />
                                    </Route>
                                    <Route path="/register">
                                        <Register />
                                    </Route>
                                    <Route path="/logout">
                                        <Logout />
                                    </Route>
                                    <Route path="/">
                                        <BoardIndex />
                                    </Route>
                                </Switch>
                            </main>
                        </div>
                        <Footer />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
