import {
  STARTER_TYPE,

} from "./actionTypes"

export const starterFunction = user => {
  return {
    type: STARTER_TYPE,
    payload: { user },
  }
}

