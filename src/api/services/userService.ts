import API from 'api/api';
import { User } from 'models/User';

const userService = {
  getUserInfo: async (): Promise<User> => {
    const data = await API.get('info');
    const user = new User(data.User);
    return {...user};

  }
}

export default userService;
