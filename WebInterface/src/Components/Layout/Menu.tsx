import React, { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import User from '../../Models/User';

interface MenuItem {
    label: string;
    href: string;
    visible?: () => boolean;
}

export interface MenuProps {
    user: User;
}

class Menu extends Component<MenuProps> {
    private _menuItems: MenuItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Login', href: '/login', visible: () => !this.props.user.isGuest },
        { label: 'Register', href: '/register', visible: () => !this.props.user.isGuest },
        { label: 'Logout', href: '/logout', visible: () => Boolean(this.props.user.isGuest) }
    ];

    private renderMenuItems(): ReactNode[] {
        return this._menuItems
            .filter((item: MenuItem) => (item.visible ? item.visible() : true))
            .map((item: MenuItem, index: number) => (
                <li key={index}>
                    <Link to={item.href}>{item.label}</Link>
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
