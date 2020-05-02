import React, { Component, ReactElement } from 'react';

interface Props {
    forumTitle: string;
}

class Header extends Component<Props> {
    public render(): ReactElement {
        return (
            <div id="header">
                <a href="/">{this.props.forumTitle}</a>
            </div>
        );
    }
}

export default Header;
