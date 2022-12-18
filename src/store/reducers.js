//////////////////// live_reducers start //////////////////////
// Front
import Layout from "./layout/reducer"

//////////////////// live_reducers end //////////////////////

import { combineReducers } from "redux"

const rootReducer = combineReducers({
  Layout,
})

export default rootReducer
