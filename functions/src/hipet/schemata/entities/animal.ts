export enum AnimalTypeOptions {
  dog = 'CACHORRO',
  cat = 'GATO'
}

export enum ColorOptions {
  spotted = 'MANCHADO',
  black = 'PRETO',
  white = 'BRANCO',
  grey = 'CINZA',
  caramel = 'CARAMELO',
  other = 'OUTRO'
}

export enum SizeOptions {
  small = 'PEQUENO',
  medium = 'MEDIO',
  big = 'GRANDE',
}

export enum SexOptions {
  female = 'FEMEA',
  male = 'MACHO'
}

type HealthInfo = {
  vaccinated: boolean
  castreated: boolean
  special_care: boolean
}

export class Animal {
  name: String
  age?: number
  color: ColorOptions
  size: SizeOptions
  health_info: HealthInfo
  type: AnimalTypeOptions
  sex: SexOptions
}
