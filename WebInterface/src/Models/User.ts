import Deserializable from './Deserializable';

class User implements Deserializable {
    public id?: number;
    public name?: string;
    public email?: string;
    public group_id?: number;
    public first_name?: string;
    public last_name?: string;
    public is_banned?: boolean;

    public isGuest(): boolean {
        return !this.group_id || this.group_id === 4;
    }

    public isLoggedIn(): boolean {
        return !this.isGuest();
    }

    public deserialize(input: any): this {
        Object.assign(this, input);

        return this;
    }
}

export default User;
