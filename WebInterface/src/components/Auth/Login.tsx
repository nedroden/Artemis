import React, { Component, FormEvent, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Button from '../../elements/Form/Button';
import TextInput from '../../elements/Form/TextInput';
import Heading from '../../elements/Heading';
import Infobox from '../../elements/Infobox';
import AuthService from '../../services/AuthService';

interface State {
    email: string;
    password: string;
    error?: string;
}

class Login extends Component<RouteComponentProps, State> {
    private _authService: AuthService;

    public constructor(props: RouteComponentProps) {
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
            const token: string | undefined = await this._authService.sendLoginRequest(
                this.state.email,
                this.state.password
            );

            if (!token) {
                this.setState({ error: 'Invalid credentials.' });

                return;
            }

            this._authService.login(token);

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
