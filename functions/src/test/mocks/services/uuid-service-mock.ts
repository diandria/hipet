import { UuidService } from '../../../hipet/services/interfaces'

export class UuidServiceStub implements UuidService {
  uuid (): string {
    return '00000000-0000-0000-0000-000000000000'
  }
}
