import React, { Component, FormEvent, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import User from '../../Models/User';
import AuthService from '../../Services/AuthService';
import Button from '../Elements/Form/Button';
import TextInput from '../Elements/Form/TextInput';
import Heading from '../Elements/Heading';
import Infobox from '../Elements/Infobox';

export interface LoginProps {
    setCurrentUser: (user: User) => void;
}

interface State {
    email: string;
    password: string;
    error?: string;
}

type Props = LoginProps & RouteComponentProps;

class Login extends Component<Props, State> {
    private _authService: AuthService;

    public constructor(props: Props) {
        super(props);

        this._authService = new AuthService();

        this.state = {
            email: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.performLoginRequest = this.performLoginRequest.bind(this);
    }

    private async performLoginRequest(): Promise<void> {
        try {
            const response: any = await this._authService.sendLoginRequest(this.state.email, this.state.password);

            if (!response.access_token) {
                this.setState({ error: response.errors[0] });

                return;
            }

            await this._authService.login(response.access_token);
            this.props.history.push('/');
        } catch (exception) {
            this.setState({ error: 'Unable to perform login request.' });
        }
    }

    private handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        this.performLoginRequest();
    }

    public render(): ReactNode {
        return (
            <div id="auth-wrapper">
                {this.state.error ? <Infobox type="error" message={this.state.error} /> : null}

                <Heading icon="lock" text="Login" />
                <div id="auth-body">
                    <p className="description">Please enter your email address and password.</p>

                    <form onSubmit={this.handleSubmit}>
                        <TextInput
                            label="Email"
                            id="email"
                            value={this.state.email}
                            type="email"
                            onChange={(value: string) => this.setState({ email: value })}
                        />

                        <TextInput
                            label="Password"
                            id="password"
                            value={this.state.password}
                            type="password"
                            onChange={(value: string) => this.setState({ password: value })}
                        />

                        <Button type="submit" label="Login" disabled={!this.state.email || !this.state.password} />
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
