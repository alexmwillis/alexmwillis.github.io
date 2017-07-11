import * as React from "react";
import Paper from "../types/Paper";

const PapersHeader = ({ papers } : { papers : Paper[] }) => {
  return (
    <h3>There are&nbsp;<span className='black'>{papers.length}</span>&nbsp;uploaded papers</h3>
  )
}

export default PapersHeader
