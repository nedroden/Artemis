import React, { Component, ReactNode } from 'react';

interface Props {
    type: 'submit';
    label: string;
    disabled?: boolean;
}

class Button extends Component<Props> {
    public render(): ReactNode {
        return (
            <button className={`button-${this.props.type}`} type={this.props.type} disabled={this.props.disabled}>
                {this.props.label}
            </button>
        );
    }
}

export default Button;
