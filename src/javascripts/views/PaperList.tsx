import * as React from "react";
import ReviewPaper from './ReviewPaper'
import { Table } from 'react-bootstrap'
import Paper from "../types/Paper";

const PaperRow = ({ paper, reviewPaper } : { paper : Paper, reviewPaper: (id:number) => void}) => {
  return (
    <tr>
      <td>{paper.id}</td>
      <td>{paper.title}</td>
      <td>{paper.author}</td>
      <td>{paper.reviewCount}</td>
      <td><ReviewPaper reviewPaper={() => reviewPaper(paper.id)}/></td>
    </tr>
  )
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
  )
}

const PaperList = ({ papers, reviewPaper } : { papers : Paper[], reviewPaper: (id:number) => void }) => {
  const papersNode = papers.map((paper) => {
    return (<PaperRow paper={paper} key={paper.id} reviewPaper={reviewPaper} />)
  })
  return (
    <Table striped bordered condensed hover>
      <thead><PaperListHeader/></thead>
      <tbody>{papersNode}</tbody>
    </Table>
  )
}

export default PaperList
