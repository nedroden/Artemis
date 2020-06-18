import React, { Component, FormEvent, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import AuthService from '../../Services/AuthService';
import Divider from '../Elements/Divider';
import Button from '../Elements/Form/Button';
import TextInput, { TextInputProps } from '../Elements/Form/TextInput';
import Heading from '../Elements/Heading';
import Infobox from '../Elements/Infobox';

interface State {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    hasAcceptedTermsOfUse: boolean;
    errors: string[];
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
            hasAcceptedTermsOfUse: false,
            errors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.performRegistrationRequest = this.performRegistrationRequest.bind(this);
    }

    private async performRegistrationRequest(): Promise<void> {
        try {
            const response: any = await this._authService.sendRegistrationRequest({
                name: this.state.username,
                email: this.state.email,
                password: this.state.password,
                passwordConfirmation: this.state.passwordConfirmation
            });

            if (response.errors) {
                const errors: string[] = [];

                Object.values(response.errors).forEach((fieldErrors: any) =>
                    fieldErrors.forEach((fieldError: string) => errors.push(fieldError))
                );
                this.setState({ errors });

                return;
            }

            if (!response.access_token) {
                this.setState({ errors: ['Did not receive token after registration.'] });

                return;
            }

            await this._authService.login(response.access_token);

            this.props.history.push('/');
        } catch (exception) {
            this.setState({ errors: ['Unable to complete registration.'] });
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
                {this.state.errors.length > 0 ? <Infobox type="error" message={this.state.errors} /> : null}

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
