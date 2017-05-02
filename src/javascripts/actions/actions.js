import JournalClient from '../types/JournalClient'

export const INVALIDATE_PAPERS = 'INVALIDATE_PAPERS'
export const REQUEST_PAPERS = 'REQUEST_PAPERS'
export const RECEIVE_PAPERS = 'RECEIVE_PAPERS'

export function invalidatePapers () {
  return { type: INVALIDATE_PAPERS }
}

function requestPapers () {
  return { type: REQUEST_PAPERS }
}

function receivePapers (papers) {
  return {
    type: RECEIVE_PAPERS,
    papers: papers,
    receivedAt: Date.now()
  }
}

export function fetchPapers () {
  return function (dispatch) {
    dispatch(requestPapers())

    return JournalClient
      .getPapers()
      .then(papers => dispatch(receivePapers(papers)))
  }
}

export function uploadPaper (title) {
  return function (dispatch) {
    return JournalClient
      .uploadPaper(title)
      .then(() => {
        dispatch(fetchPapers())
      })
  }
}

export function reviewPaper (id) {
  return function (dispatch) {
    return JournalClient
      .reviewPaper(id)
      .then(() => {
        dispatch(fetchPapers())
      })
  }
}
