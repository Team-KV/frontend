import API from 'api/api';

const userService = {
  getUserInfo: () => {
    return API.get('info');
  }
}

export default userService;
