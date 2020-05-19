import React, { Component, FormEvent, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Divider from '../../elements/Divider';
import Button from '../../elements/Form/Button';
import TextInput, { TextInputProps } from '../../elements/Form/TextInput';
import Heading from '../../elements/Heading';
import Infobox from '../../elements/Infobox';
import AuthService from '../../services/AuthService';

interface State {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    hasAcceptedTermsOfUse: boolean;
    error?: string;
}

class Register extends Component<RouteComponentProps, State> {
    private _authService: AuthService;

    public constructor(props: RouteComponentProps) {
        super(props);

        this._authService = new AuthService();

        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            hasAcceptedTermsOfUse: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.performRegistrationRequest = this.performRegistrationRequest.bind(this);
    }

    private async performRegistrationRequest(): Promise<void> {
        try {
            const token: string | undefined = await this._authService.sendRegistrationRequest({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                passwordConfirmation: this.state.passwordConfirmation
            });

            if (!token) {
                this.setState({ error: 'Did not receive token after registration.' });

                return;
            }

            this._authService.login(token);

            this.props.history.push('/');
        } catch (exception) {
            this.setState({ error: 'Unable to complete registration.' });
        }
    }

    private handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        this.performRegistrationRequest();
    }

    public isValid(): boolean {
        return (
            Boolean(this.state.email) &&
            Boolean(this.state.username) &&
            Boolean(this.state.password) &&
            this.state.password === this.state.passwordConfirmation &&
            this.state.hasAcceptedTermsOfUse
        );
    }

    private returnFields(): { [key: string]: TextInputProps } {
        return {
            username: {
                label: 'Username',
                id: 'username',
                value: this.state.username,
                type: 'text',
                onChange: (value: string) => this.setState({ username: value })
            },
            email: {
                label: 'Email',
                id: 'email',
                value: this.state.email,
                type: 'text',
                onChange: (value: string) => this.setState({ email: value })
            },
            password: {
                label: 'Password',
                id: 'password',
                value: this.state.password,
                type: 'password',
                onChange: (value: string) => this.setState({ password: value })
            },
            passwordConfirm: {
                label: 'Confirm password',
                id: 'password_confirm',
                value: this.state.passwordConfirmation,
                type: 'password',
                onChange: (value: string) => this.setState({ passwordConfirmation: value })
            }
        };
    }

    public render(): ReactNode {
        const fields: { [key: string]: TextInputProps } = this.returnFields();

        return (
            <div id="auth-wrapper-wide">
                {this.state.error ? <Infobox type="error" message={this.state.error} /> : null}

                <Heading icon="user" text="Register a new account" />
                <div id="auth-body">
                    <p className="description">Please use the form below to register a new account.</p>

                    <form onSubmit={this.handleSubmit}>
                        <TextInput {...fields.username} />
                        <TextInput {...fields.email} />
                        <TextInput {...fields.password} />
                        <TextInput {...fields.passwordConfirm} />
                        <Divider />
                        <div id="terms-of-use">Text here.</div>
                        <input
                            type="checkbox"
                            checked={this.state.hasAcceptedTermsOfUse}
                            onChange={() =>
                                this.setState((state: State) => ({
                                    hasAcceptedTermsOfUse: !state.hasAcceptedTermsOfUse
                                }))
                            }
                        />
                        I agree with the terms of use.
                        <Divider />
                        <Button type="submit" label="Register" disabled={!this.isValid()} />
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);
