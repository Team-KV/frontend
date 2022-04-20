import API from 'api/api';
import { TaskDTO } from 'models/dto/TaskDTO';
import { Task } from 'models/Task';

const taskService = {
  getClientTasks: async (clientId: number): Promise<Task[]> => {
    const { data } = await API.get('task/' + clientId);
    return data.map((dto: TaskDTO) => new Task({ ...dto }));
  },
  getTask: async (id: number): Promise<Task> => {
    const { data } = await API.get('task/' + id)
    return new Task({ ...data.Task });
  },
  addTask: async (task: Task): Promise<Task> => {
    const dto = new TaskDTO(task);
    const { data } = await API.post('task', dto);
    return new Task(data.Task)
  },
  updateTask: async (id: number, task: Task): Promise<Task> => {
    const dto = new TaskDTO(task);
    const { data } = await API.update('task/' + id, dto);
    return new Task(data.Task)
  },
  deleteTask: (id: number) => API.delete('task/' + id),


}

export default taskService;
