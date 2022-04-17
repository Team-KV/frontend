import API from 'api/api';
import { AxiosResponse } from 'axios';
import { Client } from 'models/Client';
import { ClientDTO } from 'models/dto/ClientDTO';

const ClientService = {
  getClients: async (): Promise<Client[]> => {
    const { data } = await API.get('client');
    return data.map((dto: ClientDTO) => new Client({...dto}));
  },
  getClient: async (id: number): Promise<Client> => {
    const { data } = await API.get('client/' + id);
    return new Client(data.Client);
  }, 
  updateClient: async (id: number, client: Client): Promise<Client> => {
    const dto = new ClientDTO(client);
    const { data } = await API.update('client/' + id, dto)
    return new Client(data.Client);
  },
  addClient: async (client: Client): Promise<any> => {
    const dto = new ClientDTO(client);
    const { data } = await API.post('client', dto);
    return new Client(data.Client)
  },
  deleteClient: async (id: number) => {
    return API.delete('client/' + id);
  },
  createUserFromClient: async (id: number) => {
    const { data } = await API.post(`client/${id}/user`);
    return new Client(data.Client);
  },
  uploadAttachments: async (id: number, file: any) => {
    let formData = new FormData();
    formData.append("file", file)
    const { data } = await API.postFile(`client/${id}/attachment`, formData);
  }
}

export default ClientService;