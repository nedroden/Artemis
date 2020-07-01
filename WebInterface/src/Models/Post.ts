import moment, { Moment } from 'moment';

import Deserializable from './Deserializable';
import Timed from './Timed';
import User from './User';

export default class Post implements Deserializable, Timed {
    public id?: number;
    public topic_id?: number;
    public user?: User;
    public body?: string;
    public last_updated_by_id?: number;
    public ip_address?: string;
    public topic_title?: string;
    public created_at?: string;
    public updated_at?: string;

    public deserialize(input: any): this {
        Object.assign(this, input);

        if ('user' in input) {
            this.user = new User().deserialize(input.user);
        }

        return this;
    }

    public getCreationDate(): Moment | undefined {
        if (this.created_at) {
            const date: Moment = moment(this.created_at);

            if (date.isValid()) {
                return date;
            }
        }

        return undefined;
    }

    public getModificationDate(): Moment | undefined {
        if (!this.updated_at) {
            return undefined;
        }

        const date: Moment = moment(this.updated_at);

        return date.isValid() ? date : undefined;
    }
}
