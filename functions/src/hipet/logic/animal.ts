import { AnimalTypeOptions, ColorOptions, SexOptions, SizeOptions } from '../schemata/entities'

export const validate_animal_type = (animalType: AnimalTypeOptions): boolean => {
  return Object.values(AnimalTypeOptions).includes(animalType)
}

export const validate_color = (color: ColorOptions): boolean => {
  return Object.values(ColorOptions).includes(color)
}

export const validate_size = (size: SizeOptions): boolean => {
  return Object.values(SizeOptions).includes(size)
}

export const validate_sex = (sex: SexOptions): boolean => {
  return Object.values(SexOptions).includes(sex)
}
