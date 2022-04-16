import API from 'api/api';
import { Client } from 'models/Client';
import { ClientDTO } from 'models/dto/ClientDTO';

const ClientService = {
  getClients: async (): Promise<Client[]> => {
    const data = await API.get('client');
    return data.map((dto: ClientDTO) => new Client({...dto}));
  },
  getClient: async (id: number): Promise<Client> => {
    const data = await API.get('client/' + id);
    return new Client(data.Client);
  }, 
  updateClient: async (id: number, client: Client): Promise<Client> => {
    const dto = new ClientDTO(client);
    const data = await API.update('client/' + id, dto)
    return new Client(data.Client);
  },
  addClient: async (client: Client): Promise<Client> => {
    const dto = new ClientDTO(client);
    const data = await API.post('client', dto);
    return new Client(data.Client);
  },
  deleteClient: (id: number) => {
    return API.delete('client/' + id);
  }
}

export default ClientService;