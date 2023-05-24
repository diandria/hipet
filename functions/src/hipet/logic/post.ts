import { StateOptions } from '../schemata/entities'

export const validate_post_state = (state: StateOptions): boolean => {
  return Object.values(StateOptions).includes(state)
}

export const generate_share_url = (post_id: string): string => {
  return `${process.env.BASE_URL}/post/${post_id}`
}
