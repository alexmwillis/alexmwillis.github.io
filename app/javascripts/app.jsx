import "../stylesheets/app.css";

import React from 'react';
import ReactDOM from 'react-dom';
import {default as Web3} from 'web3';
import JournalClient from './data/JournalClient';

const Title = ({paperCount}) => {
  return (
    <div>
      <h1>Open-Journal</h1><br/>
      <h2>//open source peer reviews</h2>
      <h3>There are&nbsp;<span className="black">{paperCount}</span>&nbsp;papers</h3>
    </div>
  );
}

const Paper = ({paper}) => {
  return (
    <div className="paper-item">
      <table>
        <tbody>
          <tr>
            <td>{paper.title}</td>
            <td>{paper.author}</td>
            <td>{paper.reviewCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const PaperList = ({papers}) => {
  const papersNode = papers.map((paper) => {
    return (<Paper paper={paper} key={paper.id}/>)
  });
  return (
    <div className="paper-list">{papersNode}</div>
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
        <PaperList papers={this.state.papers}/>
      </div>
    );
  }
}

ReactDOM.render(
  <OpenJournalApp/>, document.getElementById('container'));