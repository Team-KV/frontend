import SEX from 'constants/sex';
import { User } from 'models/User'
import { ClientDTO } from './dto/ClientDTO';

export interface Client {
  id: number,
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  phone: string,
  sex: number | null,
  height: number | null,
  weight: number | null,
  pin: string | null,
  insuranceCompany: number | null,
  email: string | null,
  street: string | null,
  city: string | null,
  postalCode: string | null,
  sport: string | null,
  pastIllneses: string | null,
  injuriesSuffered: string | null,
  anamnesis: string | null,
  note: string | null,
  clientId: number | null,
  user: User | null,
  parent: Client | null,
  children: Client[] | null,
  noCzech: boolean | null,
}

export class Client {
  constructor(dto: ClientDTO) {
    this.firstName = dto.first_name;
    this.lastName = dto.last_name;
    this.dateOfBirth = dto.date_born;
    this.sex = dto.sex;
    this.height = dto.height;
    this.weight = dto.weight;
    this.pin = dto.personal_information_number;
    this.insuranceCompany = dto.insurance_company;
    this.phone = dto.phone;
    this.email = dto.contact_email;
    this.street = dto.street;
    this.city = dto.city;
    this.postalCode = dto.postal_code;
    this.sport = dto.sport;
    this.pastIllneses = dto.past_illneses;
    this.injuriesSuffered = dto.injuries_suffer;
    this.anamnesis = dto.anamnesis;
    this.note = dto.note;
    this.clientId = dto.client_id;
    this.user = dto.user;
    this.parent = dto.parent ? new Client(dto.parent) : null;
    this.children = dto.children ? dto.children.map(child => new Client(child)) : null;
    this.noCzech = dto.no_czech ?? null;
  }
}