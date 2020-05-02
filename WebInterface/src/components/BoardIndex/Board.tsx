import React, { Component, ReactNode } from 'react';

import Model from '../../models/Board';

interface Props {
    details: Model;
}

class Board extends Component<Props> {
    public render(): ReactNode {
        return (
            <div className="board">
                <h3>
                    <a href="#">{this.props.details.title}</a>
                </h3>
                <p>{this.props.details.description}</p>
            </div>
        );
    }
}

export default Board;
