import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import {
  STARTER_TYPE,

} from "./actionTypes"
// import { selfActions } from "./actions"

//Include Both Helper File with needed methods

import {
  postFakeProfile,
} from "../../helpers/fakebackend_helper"
import { loadProfile } from "store/actions"



function* starterFunSaga({ payload: { user } }) {
  try {
    // eslint-disable-next-line no-unused-vars
  const response = call(postFakeProfile, user)
  yield put(loadProfile())
  } catch (error) {
    // eslint-disable-next-line no-undef
    put(starterErrorFunction(response))
  }
}


export function* watchProfile() {
  yield takeEvery(STARTER_TYPE, starterFunSaga)
 

}

function* StarterSaga() {
  yield all([fork(watchProfile)])
}

export default StarterSaga
