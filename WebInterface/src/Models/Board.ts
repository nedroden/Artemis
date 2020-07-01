import Deserializable from './Deserializable';
import Post from './Post';

class Board implements Deserializable {
    public id?: number;
    public title?: string;
    public description?: string;
    public last_message?: Post;
    public position?: number;
    public created_at?: string;
    public updated_at?: string;
    public number_of_topics = 0;
    public number_of_posts = 0;

    public deserialize(input: any): this {
        Object.assign(this, input);

        if ('last_message' in input && input.last_message) {
            this.last_message = new Post().deserialize(input.last_message);
        }

        return this;
    }
}

export default Board;
