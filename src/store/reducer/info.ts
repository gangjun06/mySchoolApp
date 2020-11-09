import { createReducer } from 'typesafe-actions'
import { ICafeteria } from 'src/apis/info'
import { actions, Actions, cafeteriaAction } from '../action/info'

type State = {
  cafeteria: {
    data?: ICafeteria[]
    message?: string
  }
}

const InitialState: State = {
  cafeteria: {
    data: [],
    message: ''
  }
}

export const InfoReducers = createReducer<State, Actions>(InitialState)
  .handleAction(cafeteriaAction.success, (state, action) => ({
    ...state,
    cafeteria: { data: action.payload.data }
  }))
  .handleAction(cafeteriaAction.failure, (state, action) => ({
    ...state,
    cafeteria: {
      message: action.payload.message
    }
  }))
  .handleAction(cafeteriaAction.request, (state, action) => ({
    ...state
  }))
