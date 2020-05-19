import Cookies from 'js-cookie';
import { BehaviorSubject, Subscription } from 'rxjs';

import GenericDeserializable from '../models/GenericDeserializable';
import RegistrationRequest from '../models/types/RegistrationRequest';
import Service from './Service';

class AuthService extends Service<GenericDeserializable> {
    private static loginStatus?: BehaviorSubject<boolean>;
    private static isLoggedIn?: boolean;

    public constructor() {
        super();

        if (!AuthService.loginStatus) {
            AuthService.isLoggedIn = this.isAuthenticated();
            AuthService.loginStatus = new BehaviorSubject<boolean>(AuthService.isLoggedIn);
        }
    }

    public async sendLoginRequest(email: string, password: string): Promise<string | undefined> {
        const validateStatus: (status: number) => boolean = (status: number) => [200, 401].includes(status);

        const result: any = await super.post(
            '/login',
            {
                email,
                password
            },
            { validateStatus }
        );

        return result?.access_token;
    }

    public async sendRegistrationRequest(request: RegistrationRequest): Promise<string | undefined> {
        const result: any = await super.post('/register', {
            email: request.email,
            name: request.username,
            password: request.password
        });

        return result?.access_token;
    }

    public isAuthenticated(): boolean {
        return Boolean(Cookies.get('artemis'));
    }

    public getToken(): string | undefined {
        return Cookies.get('artemis');
    }

    public login(token: string): void {
        Cookies.set('artemis', token, { sameSite: 'strict' });

        AuthService.isLoggedIn = true;

        if (AuthService.loginStatus) {
            AuthService.loginStatus.next(true);
        }
    }

    public subscribeToLoginStatus(callback: (value: boolean) => void): Subscription {
        if (!AuthService.loginStatus) {
            throw new Error('Cannot subscribe to inactive loginStatus service.');
        }

        return AuthService.loginStatus.subscribe(callback);
    }

    public logout(): boolean {
        if (!this.isAuthenticated()) {
            return false;
        }

        Cookies.remove('artemis');
        AuthService.isLoggedIn = false;

        if (AuthService.loginStatus) {
            AuthService.loginStatus.next(false);
        }

        return true;
    }
}

export default AuthService;
