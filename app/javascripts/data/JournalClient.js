import {default as Web3} from 'web3';
import {default as contract} from 'truffle-contract'
import openJournal_artifacts from '../../../build/contracts/OpenJournal.json'
import Paper from './Paper';

const OpenJournal = contract(openJournal_artifacts);
OpenJournal.setProvider(web3.currentProvider);

var accounts;
var account;
var counter = 0;
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
    getInstance(withInstance) {
        return new Promise((resolve, reject) => {
            OpenJournal
                .deployed()
                .then(instance => resolve(instance))
                .catch(e => {
                    console.log(e);
                    if (reject) {
                        reject(e);
                    };
                });
        });
    },
    getPaper(id) {
        return JournalClient
            .getInstance()
            .then(instance => {
                return instance
                    .getPaper
                    .call(id);
            })
            .then(paper => {
                return new Paper({
                    id: counter++, // todo fix this
                    title: paper[1].valueOf(),
                    author: paper[0].valueOf(),
                    reviewCount: paper[2].valueOf()
                });
            });
    },
    getPapers() {
        return JournalClient
            .getPaperCount()
            .then(count => {
                const ids = Array.from(Array(count).keys());
                const getPapers = ids.map(JournalClient.getPaper);
                return Promise.all(getPapers);
            });
    },    
    getPaperCount() {
        return JournalClient
            .getInstance()
            .then(instance => {
                return instance
                    .getPaperCount
                    .call();
            })
            .then(count => {
                return parseInt(count.valueOf());
            });
    },
    // reviewPaper(id, success, failure) {     this.callContract(instance => {
    //   return instance.reviewPaper(id, {from: account});     }, () => {
    // success("paper reviewed");     }, e => failure('failed to review paper')); },
    // uploadPaper(paper, success, failure) {     this.callContract(instance => {
    //      return instance.uploadPaper(paper, {from: account});     }, () => {
    //    success("paper uploaded");     }, e => failure('failed to uploaded
    // paper')); }
};

export default JournalClient;