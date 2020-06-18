import React, { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import User from '../../Models/User';

interface HeaderProps {
    forumTitle: string;
}

export interface HeaderContainerProps {
    user: User;
}

type Props = HeaderProps & HeaderContainerProps;

export default class Header extends Component<Props> {
    private renderUserInfoBox(): ReactNode {
        if (this.props.user.isLoggedIn()) {
            return (
                <div id="user-info">
                    Hello, <strong>{this.props.user?.name || 'Unknown'}</strong> | <Link to="/logout">Logout</Link>
                </div>
            );
        }

        return (
            <div id="user-info">
                Hello, <strong>guest</strong> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
            </div>
        );
    }

    public render(): ReactNode {
        return (
            <div id="header">
                <Link to="/">{this.props.forumTitle}</Link>

                {this.renderUserInfoBox()}

                <br className="clear" />
            </div>
        );
    }
}
