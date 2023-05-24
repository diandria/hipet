import { Animal } from './animal'
import { Report } from './report'
import { BasicUser } from './user'

export enum StateOptions {
  ac = 'AC',
  al = 'AL',
  ap = 'AP',
  am = 'AM',
  ba = 'BA',
  ce = 'CE',
  df = 'DF',
  es = 'ES',
  go = 'GO',
  ma = 'MA',
  mt = 'MT',
  ms = 'MS',
  mg = 'MG',
  pa = 'PA',
  pb = 'PB',
  pe = 'PE',
  pi = 'PI',
  rj = 'RJ',
  rn = 'RN',
  rs = 'RS',
  ro = 'RO',
  rr = 'RR',
  sc = 'SC',
  sp = 'SP',
  se = 'SE',
  to = 'TO'
}

export class Post {
  id: string
  user: BasicUser
  animal: Animal
  state: StateOptions
  picture?: string
  description: string
  created_at: Date
  reports: Report[]
  share_url: string
}
