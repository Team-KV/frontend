import API from 'api/api';
import { RecordDTO } from 'models/dto/RecordDTO';
import { Record } from 'models/Record';

const recordService = {
  getRecords: async(eventId: number): Promise<Record[]> => {
    const { data } = await API.get('event/' + eventId + '/record')
    return data.map((dto: RecordDTO) => new Record({ ...dto }));
  },
  getRecord: async (id: number): Promise<Record> => {
    const { data } = await API.get('record/' + id)
    return new Record({ ...data.Record });
  },
  addRecord: async (eventId: number, record: Record): Promise<Record> => {
    const dto = new RecordDTO(record);
    const { data } = await API.post('event/' + eventId + '/record', dto);
    return new Record(data.Record)
  },
  updateRecord: async (recordId: number, record: Record): Promise<Record> => {
    const dto = new RecordDTO(record);
    const { data } = await API.update('record/' + recordId, dto);
    return new Record(data.Record)
  },
  deleteRecord: (id: number) => API.delete('record/' + id),
}

export default recordService;
