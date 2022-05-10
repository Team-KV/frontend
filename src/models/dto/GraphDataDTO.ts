import { GraphData } from "models/GraphData";

export interface GraphDataDTO {
  dateTime: string,
  progress: number
}

export class GraphDataDTO {
  constructor(graph: GraphData) {
    this.dateTime = graph.dateTime;
    this.progress = graph.progress;
  }
}