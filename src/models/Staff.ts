import { StaffDTO } from "./dto/StaffDTO";

export interface Staff {
  id: number,
  firstName: string,
  lastName: string,
  phone: string,
}

export class Staff {
  constructor(dto: StaffDTO) {
    this.id = dto.id;
    this.firstName = dto.first_name;
    this.lastName = dto.last_name;
    this.phone = dto.phone;
  }
}
