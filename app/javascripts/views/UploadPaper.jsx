import React from 'react';
import JournalClient from '../data/JournalClient';

class UploadPaper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            status: ''
        };
    }

    render() {
        return <div>
            <input
                type="text"
                value={this.state.title}
                onChange={this
                .handleChange
                .bind(this)}
                placeholder="insert title..."/>
            <button
                onClick={this
                .handleClick
                .bind(this, this.state.title)}>
                Upload
            </button>
            <br/>
            <span>{this.state.status}</span>
        </div>
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