import * as React from "react";
import {connect} from "react-redux";
import {Grid, Row, Col, Panel} from "react-bootstrap";
import AppState from "../types/AppState";
import Paper from "../types/Paper";
import PaperList from "./PaperList";
import UploadPaper from "./UploadPaper";
import Title from "./Title";
import {fetchPapers, reviewPaper} from "../actions";
import PapersHeader from "./PapersHeader";
import {Dispatch} from "react-redux";

function mapStateToProps(state : AppState):{papers: Paper[]} {
  return {papers: state.papers};
}

interface IAppProps { papers : Paper[]; dispatch : Dispatch<void>; }
interface IAppState { papers : Paper[]; dispatch : Dispatch<void>; }

class App extends React.Component<IAppProps, IAppState> {

  render() {
    const { papers } = this.props
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
