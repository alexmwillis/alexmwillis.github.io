import React from 'react';
import ReviewPaper from './ReviewPaper';

const Paper = ({paper}) => {
  return (
    <div className="paper-item">
      <table>
        <tbody>
          <tr>
            <td>{paper.id}</td>
            <td>{paper.title}</td>
            <td>{paper.author}</td>
            <td>{paper.reviewCount}</td>
            <td><ReviewPaper id={paper.id} /></td>
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

export default PaperList