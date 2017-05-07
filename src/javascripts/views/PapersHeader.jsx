import React from 'react'

const PapersHeader = ({ papers }) => {
  return (
    <h3>There are&nbsp;<span className='black'>{papers.length}</span>&nbsp;uploaded papers</h3>
  )
}

export default PapersHeader
