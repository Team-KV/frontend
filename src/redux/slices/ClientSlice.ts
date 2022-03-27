import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Address {
  street: string,
  city: string,
  postalCode: string,
}

export interface ClientState {
  id: number,
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  sex: number,
  height: number,
  weight: number,
  personalInfo: string,
  insuranceCompany: number,
  phone: string,
  address: Address,
  pastIllnesses: string,
  injuries: string,
  anamnesis: string,
  note: string, 
  clientId: number,
}



