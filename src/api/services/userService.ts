import API from 'api/api';

const userService = {
  getUserInfo: async (): Promise<object> => {
    const { data } = await API.get('info');
    return { ...data.User };
  },
  changePassword: async (id: number, passwords: any): Promise<object> => {
    const { data } = await API.update('user/' + id, passwords);
    return { ...data.User };
  }
}

export default userService;