import Board from '../Models/Board';
import Service from './Service';

class BoardService extends Service<Board> {
    public async getAll(): Promise<Board[]> {
        return await super.getAll('/boards', () => new Board());
    }

    // temporary todo: should this be in the Category service? Same for API
    public async getAllByCategory(categoryId: number): Promise<Board[]> {
        return await super.getAll(`/categories/${categoryId}/boards`, () => new Board());
    }

    public async getById(id: number): Promise<Board> {
        return await super.getSingle(`/boards/${id}`, new Board());
    }
}

export default BoardService;
