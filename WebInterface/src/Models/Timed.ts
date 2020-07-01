import { Moment } from 'moment';

export default interface Timed {
    getCreationDate(): Moment | undefined;
    getModificationDate(): Moment | undefined;
}
