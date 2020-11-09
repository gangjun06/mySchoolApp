import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'src/store'
import * as actions from '../store/action/info'

export const useCafeteria = () => {
  const dispatch = useDispatch()
  const cafeteriaState = useSelector((store: RootState) => store.info.cafeteria)

  const fetchCafeteria = () => {
    dispatch(actions.cafeteriaAction.request(''))
  }

  return { cafeteriaState, fetchCafeteria }
}
