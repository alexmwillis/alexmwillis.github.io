import {combineReducers, Action} from 'redux'
import {INVALIDATE_PAPERS, REQUEST_PAPERS, RECEIVE_PAPERS} from '../actions/actions'
import AppState from '../types/AppState'
import Paper from '../types/Paper'

interface receiveAction extends Action {
  papers : Paper[]
  receivedAt : number
}

type AppAction = Action & receiveAction

function appReducer(state : AppState = {
  processing: false,
  didInvalidate: false,
  papers: [],
  lastUpdated: 0
}, action : AppAction) {
  switch (action.type) {
    case INVALIDATE_PAPERS:
      return {...state, didInvalidate: true}
    case REQUEST_PAPERS:
      return {...state, processing: true}
    case RECEIVE_PAPERS:
      return {...state, 
        processing: false,
        didInvalidate: false,
        papers: action.papers,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export default appReducer
