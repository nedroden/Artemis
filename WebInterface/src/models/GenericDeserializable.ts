import Deserializable from './Deserializable';

class GenericDeserializable implements Deserializable {
    public deserialize(input: any): this {
        Object.assign(this, input);

        return this;
    }
}

export default GenericDeserializable;
