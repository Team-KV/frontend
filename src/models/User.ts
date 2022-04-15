import { UserDTO } from "./dto/UserDTO";

export interface User {
  id?: number,
  email?: string,
  role?: number,
  staffId?: number,
  clientId?: number,
}
export class User {
  constructor(dto?: UserDTO) {
    this.id = dto?.id;
    this.email = dto?.email;
    this.role = dto?.role;
    this.staffId = dto?.staff_id;
    this.clientId = dto?.client_id;
  }
}
