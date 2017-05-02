import React from 'react'
import { connect } from 'react-redux'
import { Button, Glyphicon } from 'react-bootstrap'
import { reviewPaper } from '../actions/actions'

class ReviewPaper extends React.Component {

  constructor (props) {
    super(props)

    this.reviewPaper = id => this.props.dispatch(reviewPaper(id))

    this.state = { id: props.id }
    this.handleClick = this.handleClick.bind(this)
  }

  render () {
    return <div>
            <Button onClick={this.handleClick}>
                <Glyphicon glyph='thumbs-up'/>
            </Button>
        </div>
  }

  handleClick (e) {
    this.reviewPaper(this.state.id)
  }
}

export default connect()(ReviewPaper)
