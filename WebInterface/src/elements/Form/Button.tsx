import React, { Component, ReactNode } from 'react';

interface Props {
    type: 'submit';
    label: string;
}

class Button extends Component<Props> {
    public render(): ReactNode {
        return (
            <button className={`button-${this.props.type}`} type={this.props.type}>
                {this.props.label}
            </button>
        );
    }
}

export default Button;
