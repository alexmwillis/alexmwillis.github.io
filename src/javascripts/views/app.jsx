import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import PropTypes from 'prop-types'
import PaperList from './PaperList'
// import UploadPaper from './UploadPaper'
import Title from './Title'
import Paper from '../types/Paper'

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
             {/* <UploadPaper/> */}
          </Panel>
          <Panel>
            <h3>There are&nbsp;<span className='black'>{papers.length}</span>&nbsp;uploaded papers</h3>
            <PaperList papers={papers}/><br/>
          </Panel>
        </Col>
      </Row>
    </Grid>
  )
}

AppView.propTypes = {
  papers: PropTypes.arrayOf(PropTypes.instanceOf(Paper).isRequired).isRequired
}

export const App = connect(
  mapStateToProps
)(AppView)

