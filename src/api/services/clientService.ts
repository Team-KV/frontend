import API from 'api/api';

const ClientService = {
  getClients: () => {
    return API.get('client');
  }
}

export default ClientService;
