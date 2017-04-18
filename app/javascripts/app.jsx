import "../stylesheets/app.css";

import React from 'react';
import ReactDOM from 'react-dom';
import {default as Web3} from 'web3';
import JournalClient from './data/JournalClient';
import PaperList from './views/PaperList';
import UploadPaper from './views/UploadPaper';

const Title = ({paperCount}) => {
  return (
    <div>
      <h1>Open-Journal</h1><br/>
      <h2>//open source peer reviews</h2>
      <h3>There are&nbsp;<span className="black">{paperCount}</span>&nbsp;papers</h3>
    </div>
  );
}

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
      <div>
        <Title paperCount={this.state.papers.length}/>
        <PaperList papers={this.state.papers}/><br/>
        <UploadPaper />
      </div>
    );
  }
}

ReactDOM.render(
  <OpenJournalApp/>, document.getElementById('container'));