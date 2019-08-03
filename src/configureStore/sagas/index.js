import { fork, all } from 'redux-saga/effects'
import user from '../sagas/user';


export default function* rootSaga() {
  yield all([
    fork(user)
  ])
}