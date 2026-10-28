export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE'

export function favouritesReducer(state, action) {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      // state is an array of photo ids
      if (state.includes(action.payload)) {
        return state.filter((id) => id !== action.payload) // remove
      }
      return [...state, action.payload] // add
    default:
      return state
  }
}