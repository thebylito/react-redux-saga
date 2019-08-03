import { call, put, takeLatest, all, delay } from 'redux-saga/effects'
import api from '../../services/api';
import { Types, Creators } from '../ducks/user';

function* getUsers() {
  try{

    const response = yield call(api.get, '/users');
    yield delay(3000)
    if(response.status !== 200) throw new Error(response);
    console.log(response)
    yield put(Creators.getUsersSuccess({ users: response.data }))
  }catch(e){
    yield put(Creators.getUsersFailure({ error: 'Erro ao buscar na API' }))
  }
}

export default function* userSagas() {
  yield all([
    takeLatest(Types.GET_USERS_REQUEST, getUsers)
  ])
}