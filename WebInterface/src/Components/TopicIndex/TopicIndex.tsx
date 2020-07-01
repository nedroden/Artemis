import React, { Component, ReactNode } from 'react';

import Board from '../../Models/Board';
import Topic from '../../Models/Topic';
import BoardService from '../../Services/BoardService';
import TopicService from '../../Services/TopicService';
import Heading from '../Elements/Heading';
import TopicView from './Topic';

interface Props {
    match: {
        params: {
            id: number;
        };
    };
}

interface State {
    board: Board;
    topics: Topic[];
}

export default class TopicIndex extends Component<Props, State> {
    private _topicService: TopicService;
    private _boardService: BoardService;

    public constructor(props: Props) {
        super(props);

        this._topicService = new TopicService();
        this._boardService = new BoardService();

        this.state = { topics: [], board: new Board() };
    }

    public componentDidMount(): void {
        const {
            match: { params }
        } = this.props;

        this.loadBoard(params.id);
        this.loadTopics(params.id);
    }

    public async loadBoard(id: number): Promise<void> {
        const board: Board = await this._boardService.getById(id);

        this.setState({ board });
    }

    public async loadTopics(boardId: number): Promise<void> {
        const topics: Topic[] = await this._topicService.getAllByBoard(boardId);

        this.setState({ topics });
    }

    public render(): ReactNode {
        return (
            <div>
                <Heading text={this.state.board.title || ''} />

                <div id="topic-list">
                    {this.state.topics.map((topic: Topic, index: number) => (
                        <TopicView key={index} model={topic} />
                    ))}
                </div>
            </div>
        );
    }
}
