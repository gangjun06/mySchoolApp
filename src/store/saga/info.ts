import { takeEvery, call, put } from 'redux-saga/effects'
import { ICafeteria, requestCafeteria } from '../../apis/info'
import {
  cafeteriaAction,
  CAFETERIA_FAILED,
  CAFETERIA_REQUEST,
  CAFETERIA_SUCCESS
} from '../action/info'

function* cafeteria() {
  try {
    const res = yield call(requestCafeteria)
    const resData = res.data.mealServiceDietInfo

    if (!resData) {
      yield put({
        type: CAFETERIA_FAILED,
        payload: { message: res.data.RESULT.CODE }
      })
      return
    }

    const code = resData[0].head[1].RESULT.CODE
    if (code !== 'INFO-000') {
      yield put({
        type: CAFETERIA_FAILED,
        payload: { message: code }
      })
    } else {
      const list: ICafeteria = resData[1].row.map(
        ({ MMEAL_SC_NM, DDISH_NM, CAL_INFO, NTR_INFO }) => ({
          MMEAL_SC_NM,
          DDISH_NM,
          CAL_INFO,
          NTR_INFO
        })
      )
      yield put({
        type: CAFETERIA_SUCCESS,
        payload: { data: list }
      })
    }
  } catch (e) {
    yield put({
      type: CAFETERIA_FAILED,
      payload: { message: '네트워크 요청중 에러가 발생하였습니다.' }
    })
  }
}

export default function* sagas() {
  yield takeEvery(CAFETERIA_REQUEST, cafeteria)
}
