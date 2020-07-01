import React, { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import Model from '../../Models/Board';
import Post from '../../Models/Post';

interface Props {
    details: Model;
}

class Board extends Component<Props> {
    public renderLastMessageBox(): ReactNode {
        if (!this.props.details.last_message) {
            return <div className="last-message"></div>;
        }

        const message: Post = this.props.details.last_message;

        return (
            <div className="last-message">
                <Link to={`/topic/${message.topic_id}`}>{message.topic_title}</Link> <br />
                by <a href={`/user/${message.user?.id}`}>{message.user?.name}</a>
                <br />
                {message.getCreationDate()?.fromNow()}
            </div>
        );
    }

    public render(): ReactNode {
        const posts: number = this.props.details.number_of_posts;
        const topics: number = this.props.details.number_of_topics;

        return (
            <div className="board">
                <div className="general-board-info">
                    <h3>
                        <Link to={`/board/${this.props.details.id}`}>{this.props.details.title}</Link>
                    </h3>
                    <p>{this.props.details.description}</p>
                </div>

                <div className="num-topics-posts">
                    <span>
                        {topics} {topics === 1 ? 'topic' : 'topics'}
                    </span>
                    {posts} {posts === 1 ? 'post' : 'posts'}
                </div>

                {this.renderLastMessageBox()}

                <br style={{ clear: 'both' }} />
            </div>
        );
    }
}

export default Board;
