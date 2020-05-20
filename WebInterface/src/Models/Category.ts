import Deserializable from './Deserializable';

class Category implements Deserializable {
    public id?: number;
    public title?: string;
    public description?: string;
    public position?: number;
    public created_at?: string;
    public updated_at?: string;

    public deserialize(input: any): this {
        Object.assign(this, input);

        return this;
    }
}

export default Category;
