import { call, put, takeLatest, all, delay, fork, take, cancel, takeEvery, takeLeading, retry } from 'redux-saga/effects'
import api from '../../services/api';
import { Types, Creators } from '../ducks/user';

function* getUsers() {
  try {
    const response = yield call(api.get, '/users');
    yield take('VER_AGORA')
    yield delay(5000)
    if (response.status !== 200) throw new Error(response);
    console.log(response)
    yield put(Creators.getUsersSuccess({ users: response.data }))
  } catch (e) {
    yield put(Creators.getUsersFailure({ error: 'Erro ao buscar na API' }))
  }
}
function* fetchResource(resource, time) {
  yield delay(time)
  console.log({ resource, time })
  yield put({ type: 'OK' })
}

function* testarCancelar() {
  const taskGetUsers = yield fork(getUsers)
  yield take('CANCELAR')
  yield cancel(taskGetUsers)
  console.log('SAGA CANCELADA')
}

const request = () => new Promise((resolve, reject) => {
  console.log('entrou no request')
  setTimeout(() => {
    reject('eu falhei')
  }, 1000)
})

function* increment() {
  try {

    console.log('eae')
    ///yield delay(5000)

    const response = yield retry(5, 1000, request)
    console.log({ response })

    yield put({ type: 'INCREMENT' })
  } catch (e) {
    console.log('entrou no catch');
    console.log(e);
  }
}


export default function* userSagas() {
  yield all([
    takeLatest(Types.GET_USERS_REQUEST, testarCancelar),
    takeLatest('ON_INCREMENT_LATEST', increment),
    takeLeading('ON_INCREMENT_EVERY', increment),
  ])
}