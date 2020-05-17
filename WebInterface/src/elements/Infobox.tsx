import React, { Component, ReactNode } from 'react';

interface Props {
    type: 'error' | 'notice' | 'success' | 'info';
    message: string;
}

class Infobox extends Component<Props> {
    public render(): ReactNode {
        return <div className={`infobox infobox-${this.props.type}`}>{this.props.message}</div>;
    }
}

export default Infobox;
