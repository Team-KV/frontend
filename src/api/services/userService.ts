import API from 'api/api';
import { User } from 'models/User';

const userService = {
  getUserInfo: async (): Promise<User> => {
    const data = await API.get('info');
    return {...(new User(data.User))};
  }
}

export default userService;
