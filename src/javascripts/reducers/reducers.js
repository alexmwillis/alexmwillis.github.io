import { combineReducers } from 'redux'
import { INVALIDATE_PAPERS, REQUEST_PAPERS, RECEIVE_PAPERS } from '../actions/actions'

function papers (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_PAPERS:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_PAPERS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_PAPERS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.papers,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({ papers })

export default rootReducer
