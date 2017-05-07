import JournalClient from '../services/JournalClient'
import Paper from '../types/Paper'
import { Dispatch } from 'react-redux'
export const INVALIDATE_PAPERS = 'INVALIDATE_PAPERS'
export const REQUEST_PAPERS = 'REQUEST_PAPERS'
export const RECEIVE_PAPERS = 'RECEIVE_PAPERS'

export function invalidatePapers () {
  return { type: INVALIDATE_PAPERS }
}

function requestPapers () {
  return { type: REQUEST_PAPERS }
}

function receivePapers (papers: Paper[]) {
  return {
    type: RECEIVE_PAPERS,
    papers: papers,
    receivedAt: Date.now()
  }
}

export function fetchPapers () {
  return function (dispatch:Dispatch<void>) {
    dispatch(requestPapers())

    return JournalClient
      .getPapers()
      .then(papers => dispatch(receivePapers(papers)))
  }
}

export function uploadPaper (title:string) {
  return function (dispatch:Dispatch<void>) {
    return JournalClient
      .uploadPaper(title)
      .then(() => {
        dispatch(fetchPapers())
      })
  }
}

export function reviewPaper (id:number) {
  return function (dispatch:Dispatch<void>) {
    return JournalClient
      .reviewPaper(id)
      .then(() => {
        dispatch(fetchPapers())
      })
  }
}
