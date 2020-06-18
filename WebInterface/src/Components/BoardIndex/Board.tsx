import React, { Component, ReactNode } from 'react';

import Model from '../../Models/Board';

interface Props {
    details: Model;
}

class Board extends Component<Props> {
    public render(): ReactNode {
        return (
            <div className="board">
                <div className="general-board-info">
                    <h3>
                        <a href="/board">{this.props.details.title}</a>
                    </h3>
                    <p>{this.props.details.description}</p>
                </div>

                <div className="num-topics-posts">
                    <span>{this.props.details.number_of_topics} topics</span>
                    {this.props.details.number_of_posts} posts
                </div>

                <div className="last-message">
                    <a href="/topic">I want to ride my bicycle</a> <br />
                    by <a href="/user">Epic Administrator</a>
                    <br />
                    June 3rd, 2020, 1:30PM
                </div>

                <br style={{ clear: 'both' }} />
            </div>
        );
    }
}

export default Board;
