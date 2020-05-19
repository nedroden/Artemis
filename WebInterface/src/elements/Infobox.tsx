import React, { Component, ReactNode } from 'react';

interface Props {
    type: 'error' | 'notice' | 'success' | 'info';
    message: string | string[];
}

class Infobox extends Component<Props> {
    public render(): ReactNode {
        let message: ReactNode;

        if (Array.isArray(this.props.message)) {
            message = (
                <ul>
                    {this.props.message.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            );
        } else {
            message = this.props.message;
        }

        return <div className={`infobox infobox-${this.props.type}`}>{message}</div>;
    }
}

export default Infobox;
