import React, { Component, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import User from '../../Models/User';
import AuthService from '../../Services/AuthService';
import Infobox from '../Elements/Infobox';

export interface LogoutProps {
    setCurrentUser: (user: User) => void;
}

interface State {
    success: boolean;
}

type Props = LogoutProps & RouteComponentProps;

class Logout extends Component<Props, State> {
    private _authService: AuthService;

    public constructor(props: Props) {
        super(props);

        this._authService = new AuthService();

        this.state = {
            success: true
        };
    }

    public componentDidMount(): void {
        this.logout();
    }

    private logout(): void {
        this.props.setCurrentUser(
            new User().deserialize({
                username: 'Guest',
                email: 'unknown',
                groupId: 4,
                isGuest: true
            })
        );

        this.setState({ success: this._authService.logout() }, () => this.props.history.push('/'));
    }

    private getInfoBoxForResult(): ReactNode {
        if (!this.state.success) {
            return <Infobox type="error" message="Unable to log out. Are you sure you are logged in?" />;
        }

        return <Infobox type="success" message="You have been successfully logged out." />;
    }

    public render(): ReactNode {
        return this.getInfoBoxForResult();
    }
}

export default withRouter(Logout);
