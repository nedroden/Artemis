import React, { Component, ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    forumTitle: string;
}

class Header extends Component<Props> {
    public render(): ReactElement {
        return (
            <div id="header">
                <Link to="/">{this.props.forumTitle}</Link>
            </div>
        );
    }
}

export default Header;
