import { Staff } from "models/Staff";
import { User } from "models/User";

export interface StaffDTO {
  id: number,
  first_name: string,
  last_name: string,
  phone: string,
}

export class StaffDTO {
  constructor(staff: Staff) {
    this.id = staff.id;
    this.first_name = staff.firstName;
    this.last_name = staff.lastName;
    this.phone = staff.phone;
  }
}
