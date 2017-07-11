import * as React from "react";
import { connect } from 'react-redux'
import ReviewPaper from './ReviewPaper';
import {Modal, ProgressBar} from 'react-bootstrap';

interface IStatusBoxProps { show : boolean }

class StatusBox extends React.Component<IStatusBoxProps> {

  render() {
    return (
      <Modal show={this.props.show} backdrop='static' onHide={()=>{}}>
        <Modal.Header>
          <Modal.Title>Transaction Pending</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProgressBar active now={100} />
        </Modal.Body>        
      </Modal>
    );
  }
}

export default StatusBox