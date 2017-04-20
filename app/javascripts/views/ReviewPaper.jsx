import React from 'react';
import JournalClient from '../data/JournalClient';
import {Button, Glyphicon} from 'react-bootstrap';

class ReviewPaper extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            status: ''
        };
    }

    render() {
        return <div>
            <Button
                onClick={this
                .handleClick
                .bind(this, this.state.id)}>
                <Glyphicon glyph="book"/>
            </Button>
            <span>{this.state.status}</span>
        </div>
    }

    handleClick(id, e) {
        this.setState({status: 'Initiating transaction... (please wait)'});
        JournalClient
            .reviewPaper(id)
            .then(() => {
                this.setState({status: 'Transaction complete'});
            })
            .catch(e => {
                this.setState({status: 'Transaction failed'});
            });
    }
}

export default ReviewPaper;