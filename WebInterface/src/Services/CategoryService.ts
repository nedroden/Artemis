import Category from '../Models/Category';
import Service from './Service';

class CategoryService extends Service<Category> {
    public async getAll(): Promise<Category[]> {
        return await super.getAll('/categories', () => new Category());
    }
}

export default CategoryService;
