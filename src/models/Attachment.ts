import { AttachmentDTO } from "./dto/AttachmentDTO";

export interface Attachment {
  id: number,
  fileName: string,
  type: string,
  clientId: string,
}

export class Attachment {
  constructor(dto: AttachmentDTO) {
    this.id = dto.id;
    this.fileName = dto.file_name;
    this.type = dto.type;
    this.clientId = dto.client_id;
  }
}
