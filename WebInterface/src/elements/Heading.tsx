import React, { Component, ReactElement } from 'react';
import FontAwesome from 'react-fontawesome';

interface Props {
    text: string;
    icon?: string;
}

class Heading extends Component<Props> {
    public render(): ReactElement {
        return (
            <h1 className="heading">
                {this.props.icon ? <FontAwesome name={this.props.icon} className="icon" /> : null}
                {this.props.text}
            </h1>
        );
    }
}

export default Heading;
