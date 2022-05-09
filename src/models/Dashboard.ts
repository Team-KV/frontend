import { Client } from "models/Client";
import { Task } from "models/Task";
import { DashboardDTO } from "./dto/DashboardDTO";
import { Staff } from "./Staff";
import { Event } from "./Event"
import { GraphData } from "./GraphData";

export interface Dashboard {
  event?: Event,
  graph?: GraphData[],
  staff?: Staff,
  tasks?: Task[],
  client?: Client,
}

export class Dashboard {
  constructor(dto: DashboardDTO) {
    this.event = dto?.Event ? new Event({ ...dto.Event }) : undefined;
    this.graph = dto?.Graph.map((data) => new GraphData(data))
    this.staff = dto?.Staff ? new Staff({ ...dto.Staff}) : undefined;
    this.tasks = dto?.ActiveTasks.map((task) => new Task({...task}))
    this.client = dto?.Client ? new Client({ ...dto.Client}) : undefined;
  }
}