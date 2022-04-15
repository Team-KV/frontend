import { User } from "models/User";

export interface UserDTO {
  id?: number,
  email?: string,
  role?: number,
  staff_id?: number,
  client_id?: number, 
}

export class UserDTO {
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.role = user.role;
    this.staff_id = user.staffId;
    this.client_id = user.clientId;
  }
}
