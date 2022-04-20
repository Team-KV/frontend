import API from 'api/api';
import { Category } from 'models/Category';
import { CategoryDTO } from 'models/dto/CategoryDTO';

const categoryService = {
  getCategories: async(): Promise<Category[]> => {
    const { data } = await API.get('category')
    return data.map((dto: CategoryDTO) => new Category({...dto}));
  },
  getCategory: async (id: number): Promise<Category> => {
    const { data } = await API.get('category/' + id)
    return new Category({ ...data.Category });
  },
  addCategory: async (category: Category): Promise<Category> => {
    const dto = new CategoryDTO(category);
    const { data } = await API.post('category', dto);
    return new Category(data.Category)
  },
  updateCategory: async (id: number, category: Category): Promise<Category> => {
    const dto = new CategoryDTO(category);
    const { data } = await API.update('category/' + id, dto);
    return new Category(data.Category)
  },
  deleteCategory: (id: number) => API.delete('category/' + id),
}

export default categoryService;
