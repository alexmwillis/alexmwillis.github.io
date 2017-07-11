import Paper from './Paper'

type AppState = {
  papers: Paper[],
  processing: number
  didInvalidate: boolean
  lastUpdated: number
}

export default AppState
