export interface UserDTO {
  id: number,

}

export interface User {
  id: number,

}

export class User {
  constructor(dto: UserDTO) {
    this.id = dto.id;
  }
}
