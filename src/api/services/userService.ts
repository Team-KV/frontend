import API from 'api/api';

const UserService = {
  getUserInfo: () => {
    return API.get('info');
  }
}

export default UserService;
