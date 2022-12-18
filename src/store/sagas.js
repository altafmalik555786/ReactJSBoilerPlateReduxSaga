import { all, fork } from "redux-saga/effects"

///////////////////////// live_saga start //////////////////////////////

//public
import LayoutSaga from  './layout/saga'

export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
  ])
}


///////////////////////// live_saga start //////////////////////////////
