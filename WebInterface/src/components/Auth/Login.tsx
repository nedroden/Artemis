import Cookies from 'js-cookie';
import React, { Component, FormEvent, ReactNode } from 'react';

import Divider from '../../elements/Divider';
import Button from '../../elements/Form/Button';
import TextInput from '../../elements/Form/TextInput';
import Heading from '../../elements/Heading';
import AuthService from '../../services/AuthService';

interface State {
    email: string;
    password: string;
}

class Login extends Component<{}, State> {
    private _authService: AuthService;

    public constructor(props: {}) {
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
            const token: string | undefined = await this._authService.login(this.state.email, this.state.password);

            if (!token) {
                throw new Error('Invalid login');
            }

            Cookies.set('artemis', token, { expires: 7 });
        } catch (exception) {
            alert('Invalid login');
        }
    }

    private handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        this.performLoginRequest();
    }

    public render(): ReactNode {
        return (
            <div id="auth-wrapper">
                <Heading text="Login" />
                <div id="auth-body">
                    <p className="description">Please enter your email address and password.</p>
                    <Divider />
                    <form onSubmit={this.handleSubmit}>
                        <TextInput
                            label="Email"
                            id="email"
                            name="email"
                            value={this.state.email}
                            type="email"
                            onChange={(value: string) => this.setState({ email: value })}
                        />

                        <TextInput
                            label="Password"
                            id="password"
                            name="password"
                            value={this.state.password}
                            type="password"
                            onChange={(value: string) => this.setState({ password: value })}
                        />

                        <Button type="submit" label="Login" />
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
