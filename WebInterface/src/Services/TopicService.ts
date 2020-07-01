import Topic from '../Models/Topic';
import Service from './Service';

class TopicService extends Service<Topic> {
    public async getAllByBoard(boardId: number): Promise<Topic[]> {
        return await super.getAll(`/boards/${boardId}/topics`, () => new Topic());
    }
}

export default TopicService;
