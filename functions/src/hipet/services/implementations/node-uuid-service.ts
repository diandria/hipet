import { UuidService } from '../interfaces'
import { v4 as uuid } from 'uuid'

export class NodeUuidService implements UuidService {
  uuid (): string {
    return uuid()
  }
}
