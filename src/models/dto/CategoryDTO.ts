import { Category } from "models/Category";

export interface CategoryDTO {
  id: number,
  name: string,
  color: string,
}

export class CategoryDTO {
  constructor(dto: Category) {
    this.id = dto.id;
    this.name = dto.name;
    this.color = dto.color;
  }
}