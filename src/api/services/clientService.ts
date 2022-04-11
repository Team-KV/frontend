import API from 'api/api';
import { Client } from 'models/Client';
import { ClientDTO } from 'models/dto/ClientDTO';

const ClientService = {
  getClients: () => API.get('client'),
  getClient: (id: number) => API.get('client/' + id),
  updateClient: (id: number, client: ClientDTO) => API.update('client/' + id, client),
  addClient: (client: ClientDTO) => API.post('client', client),
  deleteClient: (id: number) => API.delete('client/' + id),
}

export default ClientService;
