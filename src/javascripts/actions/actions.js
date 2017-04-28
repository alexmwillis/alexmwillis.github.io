import JournalClient from '../types/JournalClient'

export const UPLOAD_PAPER = 'UPLOAD_PAPER'
export const INVALIDATE_PAPERS = 'INVALIDATE_PAPERS'
export const REQUEST_PAPERS = 'REQUEST_PAPERS'
export const RECEIVE_PAPERS = 'RECEIVE_PAPERS'

export function uploadPaper (title) {
  return {
    type: UPLOAD_PAPER,
    title
  }
}

export function invalidatePapers () {
  return {
    type: INVALIDATE_PAPERS
  }
}

function requestPapers () {
  return {
    type: REQUEST_PAPERS
  }
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

    return JournalClient.getPapers()
      .then(papers =>
        dispatch(receivePapers(papers))
      )
  }
}
