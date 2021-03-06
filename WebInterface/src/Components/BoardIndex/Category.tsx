import React, { Component, ReactNode } from 'react';

import conditionalSpinnerRenderer from '../../Helpers/ConditionalSpinnerRenderer';
import Board from '../../Models/Board';
import Model from '../../Models/Category';
import BoardService from '../../Services/BoardService';
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

        this.setState({
            boards: boards.sort((a: Board, b: Board) => (a?.position || 0) - (b?.position || 0))
        });
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
