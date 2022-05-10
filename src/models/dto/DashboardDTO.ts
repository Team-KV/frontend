import { ClientDTO } from "./ClientDTO";
import { EventDTO } from "./EventDTO";
import { GraphDataDTO } from "./GraphDataDTO";
import { StaffDTO } from "./StaffDTO";
import { TaskDTO } from "./TaskDTO";

export interface DashboardDTO {
  Event: EventDTO,
  Graph: GraphDataDTO[],
  Staff: StaffDTO,
  ActiveTasks: TaskDTO[],
  Client: ClientDTO,
}

export class DashboardDTO {
}