import SEX from 'constants/sex';
import { User } from 'models/User'

export interface ClientDTO {
  id: number,
  first_name: string,
  last_name: string,
  date_born: Date,
  sex?: number,
  height?: number,
  weight?: number,
  personal_information?: string,
  insurance_company?: number,
  phone?: string,
  contact_email?: string,
  street?: string,
  city?: string,
  postal_code?: string,
  sport?: string,
  past_illneses?: string,
  injuries_suffer?: string,
  diag?: string,
  note?: string,
  client_id?: number,
  user?: User,
  parent?: ClientDTO,
  children?: ClientDTO[],
}

export interface Client {
  id: number,
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  sex?: number,
  height?: number,
  weight?: number,
  personalInfo?: string,
  insuranceCompany?: number,
  phone?: string,
  email?: string,
  street?: string,
  city?: string,
  postalCode?: string,
  sport?: string,
  pastIllneses?: string,
  injuriesSuffered?: string,
  anamnesis?: string,
  note?: string,
  clientId?: number,
  user?: User,
  parent?: Client,
  children?: Client[],
}

export class Client {
  constructor(dto: ClientDTO) {
    this.firstName = dto.first_name;
    this.lastName = dto.last_name;
    this.dateOfBirth = dto.date_born;
    this.sex = dto.sex;
    this.height = dto.height;
    this.weight = dto.weight;
    this.personalInfo = dto.personal_information;
    this.insuranceCompany = dto.insurance_company;
    this.phone = dto.phone;
    this.email = dto.contact_email;
    this.street = dto.street;
    this.city = dto.city;
    this.postalCode = dto.postal_code;
    this.sport = dto.sport;
    this.pastIllneses = dto.past_illneses;
    this.injuriesSuffered = dto.injuries_suffer;
    this.anamnesis = dto.diag;
    this.note = dto.note;
    this.clientId = dto.client_id;
    this.user = dto.user;
    this.parent = dto.parent ? new Client(dto.parent) : undefined;
    this.children = dto.children ? dto.children.map(child => new Client(child)) : undefined;
  }
}