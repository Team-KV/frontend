import { GraphDataDTO } from "./dto/GraphDataDTO";

export interface GraphData {
  dateTime: string,
  progress: number
}

export class GraphData {
  constructor(dto: GraphDataDTO) {
    this.dateTime = dto.dateTime;
    this.progress = dto.progress;
  }
}