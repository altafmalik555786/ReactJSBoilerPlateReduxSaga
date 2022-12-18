import { PROFILE_ERROR } from "./actionTypes"

const initialState = {
  data: [],
  error: "",
  success: "",
 
}

const starter = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_ERROR:
      state = { ...state, data: action.payload }
      break
    
    default:
      state = { ...state }
      break
  }
  return state
}

export default starter
