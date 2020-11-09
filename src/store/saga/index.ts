import { all, fork } from 'redux-saga/effects'
import InfoSagas from './info'

export default function* saga() {
  yield all([fork(InfoSagas)])
}
