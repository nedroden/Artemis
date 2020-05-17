import React, { Component, ReactNode } from 'react';
import { Subscription } from 'rxjs';

import AuthService from '../services/AuthService';

interface MenuItem {
    label: string;
    href: string;
    visible?: () => boolean;
}

interface State {
    isLoggedIn: boolean;
    isLoggedInSubscription: Subscription;
}

class Menu extends Component<{}, State> {
    private _authService: AuthService;

    private _menuItems: MenuItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Login', href: '/login', visible: () => !this.state.isLoggedIn },
        { label: 'Register', href: '/register', visible: () => !this.state.isLoggedIn },
        { label: 'Logout', href: '/logout', visible: () => this.state.isLoggedIn }
    ];

    public constructor(props: {}) {
        super(props);

        this._authService = new AuthService();

        this.state = {
            isLoggedIn: this._authService.isAuthenticated(),
            isLoggedInSubscription: this._authService.subscribeToLoginStatus((value: boolean) => {
                this.setState({ isLoggedIn: value });
            })
        };
    }

    private renderMenuItems(): ReactNode[] {
        return this._menuItems
            .filter((item: MenuItem) => (item.visible ? item.visible() : true))
            .map((item: MenuItem, index: number) => (
                <li key={index}>
                    <a href={item.href}>{item.label}</a>
                </li>
            ));
    }

    public render(): ReactNode {
        return (
            <div id="menu">
                <ul>{this.renderMenuItems()}</ul>
            </div>
        );
    }
}

export default Menu;
