import { take, takeEvery, takeLatest, all, call, fork, put, select } from 'redux-saga/effects'
import ActionType from './action'

function realRequset(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

function *request({ payload: { ms = 2 * 1000 } }) {
    yield call(realRequset, ms)
    yield fork(fork1)
}

function *fork1() {
    yield console.log(111);
}

function *login() {
    const state = select()
    //  state.id 
    const payload = yield call(realRequset, 2000);
    yield put(ActionType.LoginSuccess as any, payload);
    //  ...
}



export default all([
    takeLatest<any>('LAST', request),
    takeLatest<any>('FORK', fork1),
])
