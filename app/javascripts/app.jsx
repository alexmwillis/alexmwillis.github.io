import "../stylesheets/app.css";
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import {default as Web3} from 'web3';
import JournalClient from './data/JournalClient';
import PaperList from './views/PaperList';
import UploadPaper from './views/UploadPaper';
import Title from './views/Title';
import StatusBox from './views/StatusBox';

class OpenJournalApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      papers: []
    };
  }

  componentDidMount() {
    JournalClient
      .getPapers()
      .then(papers => {
        this.setState({papers})
      });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Title/>
            <Panel>
              <UploadPaper/>
            </Panel>
            <Panel>
              <h3>There are&nbsp;<span className="black">{this.state.papers.length}</span>&nbsp;uploaded papers</h3>
              <PaperList papers={this.state.papers}/><br/>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}

ReactDOM.render(
  <OpenJournalApp/>, document.getElementById('container'));