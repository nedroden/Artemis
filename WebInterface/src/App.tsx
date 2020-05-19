import React, { Component, ReactNode } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Register from './components/Auth/Register';
import BoardIndex from './components/BoardIndex/BoardIndex';
import environment from './environment';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Menu from './layout/Menu';

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
