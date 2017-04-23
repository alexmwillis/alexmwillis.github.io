import React from 'react';
import ReviewPaper from './ReviewPaper';
import {Modal} from 'react-bootstrap';

class StatusBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: props.statusMessage,
      showModal: false
    };
  }

  close() {
    this.setState({showModal: false});
  }

  open() {
    this.setState({showModal: true});
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{this.state.message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}