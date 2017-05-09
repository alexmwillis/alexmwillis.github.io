import * as React from "react";
import { connect } from 'react-redux'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import AppState from '../types/AppState'
import Paper from '../types/Paper'
import PaperList from './PaperList'
import UploadPaper from './UploadPaper'
import Title from './Title'
import PapersHeader from './PapersHeader'

const mapStateToProps = (state: AppState) => {
  return {
    papers: state.papers,
    processing: state.processing
  }
}

const AppView = ({papers: Paper)}) => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <Title/>
          <Panel>
              <UploadPaper/>
          </Panel>
          <Panel>
            <PapersHeader papers={papers}/>
            <PaperList papers={papers}/><br/>
          </Panel>
        </Col>
      </Row>
    </Grid>
  )
}

export const App = connect(
  mapStateToProps
)(AppView)

