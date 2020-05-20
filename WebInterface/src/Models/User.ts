import Deserializable from './Deserializable';

class User implements Deserializable {
    public username?: string;
    public email?: string;
    public groupId?: string;
    public firstName?: string;
    public lastName?: string;
    public isBanned?: boolean;
    public isGuest?: boolean;

    public deserialize(input: any): this {
        Object.assign(this, input);

        return this;
    }
}

export default User;
