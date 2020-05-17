import GenericDeserializable from '../models/GenericDeserializable';
import Service from './Service';

class AuthService extends Service<GenericDeserializable> {
    public async login(email: string, password: string): Promise<string | undefined> {
        const result: any = await super.post('/login', {
            email,
            password
        });

        return result?.access_token;
    }
}

export default AuthService;
