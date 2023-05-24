import { VersionController } from '../../hipet/controllers'
import { ApresentationUseCases } from '../../hipet/usecases/implementations'

export const makeVersionController = (): VersionController => {
  const apresentationUseCases = new ApresentationUseCases()

  return new VersionController(apresentationUseCases)
}
