import React from 'react'
import { connect } from 'react-redux'
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Glyphicon
} from 'react-bootstrap'
import { uploadPaper } from '../actions/actions'

class UploadPaper extends React.Component {
  constructor (props) {
    super(props)

    this.uploadPaper = title => this.props.dispatch(uploadPaper(title))

    this.state = { title: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({ title: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    if (!this.state.title) {
      return
    }
    this.uploadPaper(this.state.title)
    this.setState({ title: '' })
  }

  render () {
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormGroup controlId='formUploadPaper'>
          <ControlLabel>Upload Paper</ControlLabel>
          {' '}
          <FormControl
            type='text'
            value={this.state.title}
            placeholder='insert title...'
            onChange={this.handleChange}/>
        </FormGroup>
        {' '}
        <Button type='submit'>
          <Glyphicon glyph='book'/>
        </Button>
        <span>{this.state.status}</span>
      </Form>
    )
  }
}

export default connect()(UploadPaper)
