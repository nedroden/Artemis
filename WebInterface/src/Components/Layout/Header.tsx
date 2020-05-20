import React, { Component, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Subscription } from 'rxjs';

import AuthService from '../../Services/AuthService';

interface Props {
    forumTitle: string;
}

interface State {
    isLoggedIn: boolean;
    isLoggedInSubscription: Subscription;
}

class Header extends Component<Props, State> {
    private _authService: AuthService;

    public constructor(props: Props) {
        super(props);

        this._authService = new AuthService();

        this.state = {
            isLoggedIn: this._authService.isAuthenticated(),
            isLoggedInSubscription: this._authService.subscribeToLoginStatus((value: boolean) => {
                this.setState({ isLoggedIn: value });
            })
        };
    }

    private renderUserInfoBox(): ReactElement {
        if (this.state.isLoggedIn) {
            return (
                <div id="user-info">
                    Hello, <strong>Administrator</strong> | <Link to="/logout">Logout</Link>
                </div>
            );
        }

        return (
            <div id="user-info">
                Hello, <strong>guest</strong> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
            </div>
        );
    }

    public render(): ReactElement {
        return (
            <div id="header">
                <Link to="/">{this.props.forumTitle}</Link>

                {this.renderUserInfoBox()}

                <br className="clear" />
            </div>
        );
    }
}

export default Header;
