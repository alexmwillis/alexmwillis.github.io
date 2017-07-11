import * as React from "react";
import { connect } from 'react-redux'
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Glyphicon
} from 'react-bootstrap'
import { uploadPaper } from '../actions'
import {Dispatch} from "react-redux";

interface IUploadPaperProps { dispatch : Dispatch<void>; }
interface IUploadPaperState { title : string }

class UploadPaper extends React.Component<IUploadPaperProps, IUploadPaperState> {
  constructor (props : IUploadPaperProps) {
    super(props)

    this.state = { title: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e:any) {
    this.setState({ title: e.target.value })
  }

  handleSubmit (e:any) {
    const title = this.state.title

    e.preventDefault()
    if (!title) {
      return
    }

    this.props.dispatch((dispatch:Dispatch<void>) => {  
      uploadPaper(title)(dispatch).then(() => this.setState({ title: '' }))
    })    
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
      </Form>
    )
  }
}


function mapStateToProps(state: any) {
  return { }
}

export default connect(mapStateToProps)(UploadPaper)
