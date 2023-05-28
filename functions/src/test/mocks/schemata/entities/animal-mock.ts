import { Animal, AnimalTypeOptions, ColorOptions, SexOptions, SizeOptions } from '../../../../hipet/schemata/entities'

export const mockAnimal = (): Animal => {
  const animal = new Animal()
  animal.name = 'any_name'
  animal.age = 1
  animal.color = ColorOptions.black
  animal.size = SizeOptions.small
  animal.type = AnimalTypeOptions.dog
  animal.sex = SexOptions.male
  animal.health_info = {
    vaccinated: true,
    castreated: true,
    special_care: true
  }
  return animal
}
