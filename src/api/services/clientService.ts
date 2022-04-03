import API from 'api/api';
import { Client } from 'models/Client';

const ClientService = {
  getClients: () => API.get('client'),
  getClient: (id: number) => API.get('client/' + id)
  // updateClient: (id: number, client: Client) => API.update('client/' + id, 'user')
  // addClient: (client: Client) => API.
}

export default ClientService;
