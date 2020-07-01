import React, { Component, ReactNode } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logout from './Components/Auth/Logout';
import Register from './Components/Auth/Register';
import BoardIndex from './Components/BoardIndex/BoardIndex';
import Footer from './Components/Layout/Footer';
import TopicIndex from './Components/TopicIndex/TopicIndex';
import Login from './Containers/Auth/Login';
import Header from './Containers/Layout/Header';
import Menu from './Containers/Layout/Menu';
import environment from './environment';
import AuthService from './Services/AuthService';

class App extends Component {
    public componentDidMount(): void {
        const authService: AuthService = new AuthService();
        authService.loadToken();
        authService.refresh();
    }

    public render(): ReactNode {
        return (
            <div>
                <BrowserRouter>
                    <div className="app-wrapper">
                        <Header forumTitle={environment.forumTitle} />
                        <Menu />
                        <div className="app">
                            <main>
                                <Switch>
                                    <Route path="/board/:id" component={TopicIndex} />
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
