import { Client } from "models/Client";
import { User } from "models/User";

export interface ClientDTO {
  id: number,
  first_name: string,
  last_name: string,
  date_born: string,
  sex: number | null,
  height: number | null,
  weight: number | null,
  personal_information_number: string | null,
  insurance_company: number | null,
  phone: string,
  contact_email: string | null,
  street: string | null,
  city: string | null,
  postal_code: string | null,
  sport: string | null,
  past_illnesses: string | null,
  injuries_suffered: string | null,
  anamnesis: string | null,
  note: string | null,
  client_id: number | null,
  user: User | null,
  parent: ClientDTO | null,
  children: ClientDTO[] | null,
  no_czech: boolean,
}

export class ClientDTO {
  constructor(client: Client) {
    this.id = client.id ?? null;
    this.first_name = client.firstName;
    this.last_name = client.lastName;
    this.date_born = new Date(client.dateOfBirth).toISOString().split('T')[0];
    this.sex = client.sex ?? null;
    this.height = client.height ?? null;
    this.weight = client.weight ?? null;
    this.personal_information_number = client.pin ?? null;
    this.insurance_company = client.insuranceCompany ?? null;
    this.phone = client.phone ?? null;
    this.contact_email = client.email ?? null;
    this.street = client.street ?? null;
    this.city = client.city ?? null;
    this.postal_code = client.postalCode ?? null;
    this.sport = client.sport ?? null;
    this.past_illnesses = client.pastIllneses ?? null;
    this.injuries_suffered = client.injuriesSuffered ?? null;
    this.anamnesis = client.anamnesis ?? null;
    this.note = client.note ?? null;
    this.no_czech = client.noCzech ?? false;
    this.client_id = client.clientId ?? null;
  }
}
