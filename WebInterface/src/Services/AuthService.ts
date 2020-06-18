import Cookies from 'js-cookie';

import { setCurrentUser } from '../Actions/Auth';
import GenericDeserializable from '../Models/GenericDeserializable';
import RegistrationRequest from '../Models/Types/RegistrationRequest';
import User from '../Models/User';
import Service from './Service';

class AuthService extends Service<GenericDeserializable> {
    public async sendLoginRequest(email: string, password: string): Promise<any> {
        const validateStatus: (status: number) => boolean = (status: number) => [200, 401].includes(status);

        const result: any = await super.post(
            '/login',
            {
                email,
                password
            },
            { validateStatus }
        );

        return result;
    }

    public async sendRegistrationRequest(request: RegistrationRequest): Promise<any> {
        const validateStatus: (status: number) => boolean = (status: number) => [201, 400].includes(status);

        const result: any = await super.post(
            '/register',
            {
                email: request.email,
                name: request.name,
                password: request.password,
                password_confirmation: request.passwordConfirmation // eslint-disable-line
            },
            { validateStatus }
        );

        return result;
    }

    public async getUserInfo(id?: number): Promise<User> {
        if (id) {
            throw new Error('This action is not yet supported.');
        }

        return (await super.getSingle('/users/0', new User())) as User;
    }

    public loadToken(): void {
        this.setToken(Cookies.get('artemis'));
    }

    public async refresh(): Promise<void> {
        try {
            const userInfo: User = await this.getUserInfo();
            AuthService.store.dispatch(setCurrentUser(userInfo));
        } catch (error) {
            AuthService.store.dispatch(setCurrentUser());
        }
    }

    public async login(token: string): Promise<void> {
        Cookies.set('artemis', token, { sameSite: 'strict' });
        this.setToken(token);
        await this.refresh();
    }

    public logout(): boolean {
        if (AuthService.store.getState().auth.user.isGuest()) {
            return false;
        }

        Cookies.remove('artemis');
        this.setToken();
        this.refresh();

        return true;
    }
}

export default AuthService;
