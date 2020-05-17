import React, { Component, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Infobox from '../../elements/Infobox';
import AuthService from '../../services/AuthService';

interface State {
    success: boolean;
}

class Logout extends Component<RouteComponentProps, State> {
    private _authService: AuthService;

    public constructor(props: RouteComponentProps) {
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
