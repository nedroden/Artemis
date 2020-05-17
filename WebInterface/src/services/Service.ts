import axios, { AxiosResponse } from 'axios';

import environment from '../environment';
import Deserializable from '../models/Deserializable';

abstract class Service<T extends Deserializable> {
    private _url: (endpoint: string) => string = (endpoint: string) => `${environment.apiUrl}${endpoint}`;

    public async getSingle(endpoint: string, object: T): Promise<T> {
        const response: AxiosResponse = await axios.get(this._url(endpoint));

        return object.deserialize(response.data.data);
    }

    public async getAll(endpoint: string, objectCreator: () => T): Promise<T[]> {
        const response: AxiosResponse = await axios.get(this._url(endpoint));

        return response.data.data.map((item: any) => objectCreator().deserialize(item));
    }

    public async post(endpoint: string, payload: any): Promise<any> {
        const response: AxiosResponse = await axios.post(this._url(endpoint), payload);

        return response.data;
    }
}

export default Service;
