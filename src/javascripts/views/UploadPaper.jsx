import React from 'react';
import JournalClient from '../data/JournalClient';
import {Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

class UploadPaper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            status: ''
        };
    }

    render() {
        return <Form inline>
            <FormGroup controlId="formUploadPaper">
                <ControlLabel>Upload Paper</ControlLabel>
                {' '}
                <FormControl
                    type="text"
                    value={this.state.title}
                    placeholder="insert title..."
                    onChange={this.handleChange}/>
            </FormGroup>
            {' '}
            <Button
                onClick={this
                .handleClick
                .bind(this, this.state.title)}>
                Upload
                <Glyphicon glyph="book"/>
            </Button>
            <span>{this.state.status}</span>
        </Form>
    }

    handleClick(title, e) {
        this.setState({status: 'Initiating transaction... (please wait)'});
        JournalClient
            .uploadPaper(title)
            .then(() => {
                this.setState({status: 'Transaction complete'});
            })
            .catch(e => {
                this.setState({status: 'Transaction failed'});
            });
    }

    handleChange(e) {
        this.setState({title: e.target.value});
    }
}

export default UploadPaper;