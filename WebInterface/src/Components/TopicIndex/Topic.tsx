import React, { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import Post from '../../Models/Post';
import TopicModel from '../../Models/Topic';

interface Props {
    model: TopicModel;
}

export default class Topic extends Component<Props> {
    public renderLastMessageBox(post: Post | undefined): ReactNode {
        if (!post) {
            return <div className="topic-last-message"></div>;
        }

        return (
            <div className="topic-last-message">
                Last message by <Link to={`/user/${post.user?.id}`}>{post.user?.name}</Link>
                <br />
                on {post.getCreationDate()?.fromNow()}
            </div>
        );
    }

    public render(): ReactNode {
        const numReplies: number = this.props.model.number_of_replies || 0;

        return (
            <div className="topic-list-item">
                <div className="topic-title-container">
                    <Link to="/topic" className="topic-title">
                        {this.props.model.title}
                    </Link>
                    <br />
                    Started by <Link to="/user">Username</Link>
                </div>

                <div className="topic-num-replies">
                    {numReplies} {numReplies === 1 ? 'reply' : 'replies'}
                </div>

                {this.renderLastMessageBox(this.props.model.last_message)}

                <br style={{ clear: 'both' }} />
            </div>
        );
    }
}
