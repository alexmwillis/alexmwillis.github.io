import * as React from "react";
import {connect} from "react-redux";
import {Grid, Row, Col, Panel} from "react-bootstrap";
import AppState from "../types/AppState";
import Paper from "../types/Paper";
import PaperList from "./PaperList";
import UploadPaper from "./UploadPaper";
import Title from "./Title";
import StatusBox from "./StatusBox";
import {fetchPapers, reviewPaper} from "../actions";
import PapersHeader from "./PapersHeader";
import {Dispatch} from "react-redux";

function mapStateToProps(state : AppState): IAppProps {
  return {
    papers: state.papers, 
    processing: state.processing,
    lastUpdated: state.lastUpdated
  };
}

interface IAppProps { papers : Paper[]; processing : number; lastUpdated : number }

class App extends React.Component<IAppProps & { dispatch : Dispatch<void> }> {

  render() {
    const { papers } = this.props
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <StatusBox show={this.props.processing > 0}/>
            <Title/>
            <Panel>
              <UploadPaper/>
            </Panel>
            <Panel>
              <PapersHeader papers={papers}/>
              <PaperList papers={papers} reviewPaper={
                (id : number) => { this.props.dispatch(reviewPaper(id))}}/>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(App);
