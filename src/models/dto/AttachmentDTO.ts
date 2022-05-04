import { Event } from "models/Event";
import { EventTypeDTO } from "./EventTypeDTO";
import { ClientDTO } from "./ClientDTO";
import { StaffDTO } from "./StaffDTO";
import { RecordDTO } from "./RecordDTO";
import { Record } from "models/Record";
import { Attachment } from "models/Attachment";

export interface AttachmentDTO {
  id: number,
  file_name: string,
  type: string,
  url: string,
  client_id: string,
}

export class AttachmentDTO {
  constructor(attachment: Attachment) {
    this.id = attachment.id;
    this.file_name = attachment.fileName;
    this.type = attachment.type;
    this.url = attachment.url;
    this.client_id = attachment.clientId;
  }
}
