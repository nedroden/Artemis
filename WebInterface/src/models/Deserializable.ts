export default interface Deserializable {
    deserialize(input: any): this;
}
