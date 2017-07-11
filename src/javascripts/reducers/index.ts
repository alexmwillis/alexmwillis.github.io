import {Action} from 'redux'
import {AppAction, INVALIDATE_PAPERS, BEGIN_TRANSACTION, END_TRANSACTION, RECEIVE_PAPERS} from '../actions'
import AppState from '../types/AppState'
import Paper from '../types/Paper'

function appReducer(state : AppState = {
  processing: 0,
  didInvalidate: false,
  papers: [],
  lastUpdated: 0
}, action : AppAction) {
  switch (action.type) {
    case INVALIDATE_PAPERS:
      return {...state, didInvalidate: true}
    case BEGIN_TRANSACTION:
      return {...state, processing: state.processing + 1}
    case END_TRANSACTION:
      return {...state, processing: state.processing - 1}
    case RECEIVE_PAPERS:
      return {...state, 
        didInvalidate: false,
        papers: action.papers,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export default appReducer
