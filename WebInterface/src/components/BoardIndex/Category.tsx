import React, { Component, ReactNode } from 'react';

import conditionalSpinnerRenderer from '../../helpers/ConditionalSpinnerRenderer';
import Board from '../../models/Board';
import Model from '../../models/Category';
import BoardService from '../../services/BoardService';
import BoardView from './Board';

interface Props {
    details: Model;
}

interface State {
    boards: Board[];
}

class Category extends Component<Props, State> {
    private _boardService: BoardService;

    public constructor(props: Props) {
        super(props);

        this.state = { boards: [] };

        this._boardService = new BoardService();
    }

    public componentDidMount(): void {
        this.loadBoards();
    }

    private async loadBoards(): Promise<void> {
        if (!this.props.details.id) {
            return;
        }

        const boards: Board[] = await this._boardService.getAllByCategory(this.props.details.id);

        this.setState({ boards });
    }

    public render(): ReactNode {
        return (
            <div className="category">
                {conditionalSpinnerRenderer(this.state.boards.length === 0)}
                <div className="category-info">
                    <h2>{this.props.details.title}</h2>
                    <p>{this.props.details.description}</p>
                </div>
                <div className="category-board-container">
                    {this.state.boards.map((board: Board, key: number) => (
                        <BoardView key={key} details={board} />
                    ))}
                </div>
            </div>
        );
    }
}

export default Category;
