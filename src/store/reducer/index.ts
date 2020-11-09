import { combineReducers } from 'redux'
import { InfoReducers } from './info'

export const reducers = combineReducers({
  info: InfoReducers
})
