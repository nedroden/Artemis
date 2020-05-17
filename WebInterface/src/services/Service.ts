import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import environment from '../environment';
import Deserializable from '../models/Deserializable';

abstract class Service<T extends Deserializable> {
    private _url: (endpoint: string) => string = (endpoint: string) => `${environment.apiUrl}${endpoint}`;

    private static token: string;

    private injectAuthorizationHeader(requestConfig?: AxiosRequestConfig): AxiosRequestConfig {
        const options: AxiosRequestConfig = requestConfig ?? {};

        if (!options.headers) {
            options.headers = {};
        }

        if (Service.token) {
            options.headers.Authorization = `Bearer ${Service.token}`;
        }

        return options;
    }

    public async getSingle(endpoint: string, object: T, options?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse = await axios.get(this._url(endpoint), this.injectAuthorizationHeader(options));

        return object.deserialize(response.data.data);
    }

    public async getAll(endpoint: string, objectCreator: () => T, options?: AxiosRequestConfig): Promise<T[]> {
        const response: AxiosResponse = await axios.get(this._url(endpoint), this.injectAuthorizationHeader(options));

        return response.data.data.map((item: any) => objectCreator().deserialize(item));
    }

    public async post(endpoint: string, payload: any, options?: AxiosRequestConfig): Promise<any> {
        const response: AxiosResponse = await axios.post(
            this._url(endpoint),
            payload,
            this.injectAuthorizationHeader(options)
        );

        return response.data;
    }

    public setToken(token: string): void {
        Service.token = token;
    }
}

export default Service;
