import { CategoryDTO } from "./dto/CategoryDTO";

export interface Category {
  id: number,
  name: string,
  color: string,
}

export class Category {
  constructor(dto: CategoryDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.color = dto.color;
  }
}