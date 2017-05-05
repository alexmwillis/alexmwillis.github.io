import React from 'react'
import { connect } from 'react-redux'
import { Button, Glyphicon } from 'react-bootstrap'
import { reviewPaper } from '../actions/actions'

class ReviewPaper extends React.Component {

  constructor (props) {
    super(props)

    this.state = { id: props.id }
  }

  render () {
    return <div>
            <Button block onClick={this.handleClick}>
                <Glyphicon glyph='thumbs-up'/>
            </Button>
        </div>
  }

  reviewPaper (e) {
    this.props.dispatch(reviewPaper(this.state.id))
  }
}

export default connect()(ReviewPaper)
