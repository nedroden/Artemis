import React, { Component, ReactNode } from 'react';

interface MenuItem {
    label: string;
    href: string;
}

class Menu extends Component {
    private _menuItems: MenuItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Login', href: '/login' },
        { label: 'Register', href: '/register' }
    ];

    private renderMenuItems(): ReactNode[] {
        return this._menuItems.map((item: MenuItem, index: number) => (
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
