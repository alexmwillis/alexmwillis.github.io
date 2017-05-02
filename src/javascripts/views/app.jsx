import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import PaperList from './PaperList'
import UploadPaper from './UploadPaper'
import Title from './Title'
import PapersHeader from './PapersHeader'

const mapStateToProps = (state) => {
  return {
    papers: state.papers.items
  }
}

const AppView = ({ papers }) => {
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

