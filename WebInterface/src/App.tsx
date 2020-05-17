import React, { Component, ReactNode } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './components/Auth/Login';
import BoardIndex from './components/BoardIndex/BoardIndex';
import environment from './environment';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Menu from './layout/Menu';

class App extends Component {
    public render(): ReactNode {
        return (
            <div>
                <Header forumTitle={environment.forumTitle} />
                <BrowserRouter>
                    <Menu />
                    <div className="app-wrapper">
                        <div className="app">
                            <main>
                                <Switch>
                                    <Route path="/login">
                                        <Login />
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
