import React from 'react'
import PropTypes from 'prop-types'
import Paper from '../types/Paper'

const PapersHeader = ({ papers }) => {
  return (
    <h3>There are&nbsp;<span className='black'>{papers.length}</span>&nbsp;uploaded papers</h3>
  )
}

PapersHeader.propTypes = {
  papers: PropTypes
    .arrayOf(PropTypes.instanceOf(Paper).isRequired)
    .isRequired
}

export default PapersHeader
