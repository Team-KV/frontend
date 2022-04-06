import API from 'api/api';
import { Client } from 'models/Client';
import { ClientDTO } from 'models/dto/ClientDTO';

const ClientService = {
  getClients: () => API.get('client'),
  getClient: (id: number) => API.get('client/' + id),
  // updateClient: (id: number, client: Client) => API.update('client/' + id, 'user')
  addClient: (client: ClientDTO) => API.post('client', client)
}

export default ClientService;
