import API from 'api/api';

const userService = {
  getUserInfo: async (): Promise<object> => {
    const { data } = await API.get('info');
    return { ...data.User };
  }
}

export default userService;