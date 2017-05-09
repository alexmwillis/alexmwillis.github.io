import Paper from './Paper'

type AppState = {
  papers: Paper[],
  processing: boolean
  didInvalidate: boolean
  lastUpdated: number
}

export default AppState
