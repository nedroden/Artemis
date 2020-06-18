import Deserializable from './Deserializable';

class Board implements Deserializable {
    public id?: number;
    public title?: string;
    public description?: string;
    public last_message?: string;
    public position?: number;
    public created_at?: string;
    public updated_at?: string;
    public number_of_topics = 0;
    public number_of_posts = 0;

    public deserialize(input: any): this {
        Object.assign(this, input);

        return this;
    }
}

export default Board;
