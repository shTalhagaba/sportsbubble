import {put, takeLatest} from 'redux-saga/effects';
function* signIn(action: any) {
  try {
  } catch (e) {
    yield put({type: 'SIGN_IN_FAILURE', payload: e});
  }
}
// Listen to requests.
function* mySaga() {
  // User
  yield takeLatest('SIGN_IN', signIn);
}

export default mySaga;
