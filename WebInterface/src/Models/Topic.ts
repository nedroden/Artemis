import moment, { Moment } from 'moment';

import Deserializable from './Deserializable';
import Timed from './Timed';

export default class Post implements Deserializable, Timed {
    public id?: number;
    public board_id?: number;
    public title?: string;
    public number_of_replies?: number;
    public is_locked?: boolean;
    public is_sticky?: boolean;
    public last_message?: Post;
    public created_at?: string;
    public updated_at?: string;

    public deserialize(input: any): this {
        Object.assign(this, input);

        if ('last_message' in input) {
            this.last_message = new Post().deserialize(input.last_message);
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
