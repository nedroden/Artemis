import React, { Component, ReactElement } from 'react';

interface Props {
    text: string;
}

class Heading extends Component<Props> {
    public render(): ReactElement {
        return <h1 className="heading">{this.props.text}</h1>;
    }
}

export default Heading;
