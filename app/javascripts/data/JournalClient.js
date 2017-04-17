import {default as Web3} from 'web3';
import {default as contract} from 'truffle-contract'
import openJournal_artifacts from '../../../build/contracts/OpenJournal.json'
import Paper from './Paper';

const OpenJournal = contract(openJournal_artifacts);
OpenJournal.setProvider(web3.currentProvider);

var accounts;
var account;

if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider);
} else {
    console.warn("No web3 detected.");
}

web3
    .eth
    .getAccounts(function (err, accs) {
        if (err != null) {
            alert("There was an error fetching your accounts.");
            return;
        }

        if (accs.length == 0) {
            alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctl" +
                    "y.");
            return;
        }

        accounts = accs;
        account = accounts[0];
    });

const JournalClient = {
    callContract(withInstance, withReturnValue, failure) {
        OpenJournal
            .deployed()
            .then(function (instance) {
                return withInstance(instance);
            })
            .then(function (value) {
                withReturnValue(value)
            })
            .catch(function (e) {
                console.log(e);
                failure(e);
            });
    },
    getPapers(success, failure) {
        this.getPaperCount(count => {
            for (var i = 0; i < count; i++) {
                this.getPaper(i, success);
            }
        }, e => failure('failed to get papers'));
    },
    getPaper(id, success, failure) {
        this.callContract(instance => {
            return instance
                .getPaper
                .call(id)
        }, paper => {
            success(new Paper({
                title: paper[1].valueOf(),
                author: paper[0].valueOf(),
                reviewCount: paper[2].valueOf()
            }));
        }, e => failure('failed to get paper'));
    },
    getPaperCount(success, failure) {
        this.callContract(instance => {
            return instance
                .getPaperCount
                .call();
        }, count => {
            success(count);
        }, e => failure('failed to get paper count'));
    },
    reviewPaper(id, success, failure) {
        this.callContract(instance => {
            return instance.reviewPaper(id, {from: account});
        }, () => {
            success("paper reviewed");
        }, e => failure('failed to review paper'));
    },
    uploadPaper(paper, success, failure) {
        this.callContract(instance => {
            return instance.uploadPaper(paper, {from: account});
        }, () => {
            success("paper uploaded");
        }, e => failure('failed to uploaded paper'));
    }
};

export default JournalClient;