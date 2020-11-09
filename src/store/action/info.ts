import { ICafeteria } from 'src/apis/info'
import { createAsyncAction, ActionType } from 'typesafe-actions'

export const CAFETERIA_REQUEST = 'info/cafeteria/request'
export const CAFETERIA_SUCCESS = 'info/cafeteria/success'
export const CAFETERIA_FAILED = 'info/cafeteria/failed'

interface ICafeteriaRequest {}
interface ICafeteriaResponse {
  data: ICafeteria[]
}
interface ICafeteriaError {
  message: string
}

export const cafeteriaAction = createAsyncAction(
  CAFETERIA_REQUEST,
  CAFETERIA_SUCCESS,
  CAFETERIA_FAILED
)<ICafeteriaRequest, ICafeteriaResponse, ICafeteriaError>()

export const actions = {
  cafeteriaAction
}

export type Actions = ActionType<typeof actions>
