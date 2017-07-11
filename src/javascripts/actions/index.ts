import JournalClient from '../services/JournalClient'
import Paper from '../types/Paper'
import { Dispatch } from 'react-redux'

export type INVALIDATE_PAPERS = 'INVALIDATE_PAPERS'
export const INVALIDATE_PAPERS : INVALIDATE_PAPERS = 'INVALIDATE_PAPERS'

export type BEGIN_TRANSACTION = 'BEGIN_TRANSACTION'
export const BEGIN_TRANSACTION : BEGIN_TRANSACTION = 'BEGIN_TRANSACTION'

export type END_TRANSACTION = 'END_TRANSACTION'
export const END_TRANSACTION : END_TRANSACTION = 'END_TRANSACTION'

export type RECEIVE_PAPERS = 'RECEIVE_PAPERS'
export const RECEIVE_PAPERS : RECEIVE_PAPERS = 'RECEIVE_PAPERS'

type invalidateAction = { type: INVALIDATE_PAPERS }
type beginTransactionAction = { type: BEGIN_TRANSACTION }
type endTransactionAction = { type: END_TRANSACTION }
type receiveAction = {
  type : RECEIVE_PAPERS, 
  papers : Paper[]
  receivedAt : number
}
type OtherAction = { type: '' };
const OtherAction : OtherAction = { type: '' };
  
export type AppAction = invalidateAction | beginTransactionAction | endTransactionAction | receiveAction | OtherAction

export function invalidatePapers () {
  return { type: INVALIDATE_PAPERS }
}

function beginTransaction () {
  return { type: BEGIN_TRANSACTION }
}

function endTransaction () {
  return { type: END_TRANSACTION }
}

function receivePapers (papers : Paper[]) {
  return {
    type: RECEIVE_PAPERS,
    papers: papers,
    receivedAt: Date.now()
  }
}

export function fetchPapers () {
  return function (dispatch : Dispatch<void>) {
    dispatch(beginTransaction())

    return JournalClient
      .getPapers()
      .then(papers => dispatch(receivePapers(papers)))
      .then(() => dispatch(endTransaction()))
      .catch(() => dispatch(endTransaction()))
  }
}

export function uploadPaper (title : string) {
  return function (dispatch : Dispatch<void>) {
    dispatch(beginTransaction())

    return JournalClient
      .uploadPaper(title)
      .then(() => dispatch(fetchPapers()))
      .then(() => dispatch(endTransaction()))
      .catch(() => dispatch(endTransaction()))
  }
}

export function reviewPaper (id : number) {
  return function (dispatch : Dispatch<void>) {
    dispatch(beginTransaction())
    
    return JournalClient
      .reviewPaper(id)
      .then(() => dispatch(fetchPapers()))
      .then(() => dispatch(endTransaction()))
      .catch(() => dispatch(endTransaction()))
  }
}
