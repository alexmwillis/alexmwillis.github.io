import React from 'react';
import ReviewPaper from './ReviewPaper';
import {Table} from 'react-bootstrap';

const Paper = ({paper}) => {
  return (
    <tr>
      <td>{paper.id}</td>
      <td>{paper.title}</td>
      <td>{paper.author}</td>
      <td>{paper.reviewCount}</td>
      <td><ReviewPaper id={paper.id}/></td>
    </tr>
  );
}

const PaperListHeader = () => {
  return (
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Author</th>
      <th>Review Count</th>
      <th>Review</th>
    </tr>
  );
}

const PaperList = ({papers}) => {
  const papersNode = papers.map((paper) => {
    return (<Paper paper={paper} key={paper.id}/>)
  });
  return (
    <Table striped bordered condensed hover>
      <thead><PaperListHeader/></thead>
      <tbody>{papersNode}</tbody>
    </Table>
  );
}

export default PaperList