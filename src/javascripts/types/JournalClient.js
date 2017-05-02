// todo move this file
import { default as contract } from 'truffle-contract'
import openJournalArtifacts from '../../../build/contracts/OpenJournal.json'
import Paper from './Paper'

var accounts
var account

const OpenJournal = contract(openJournalArtifacts)

if (typeof web3 !== 'undefined') {
  OpenJournal.setProvider(web3.currentProvider)

  web3
        .eth
        .getAccounts(function (err, accs) {
          if (err != null) {
            window.alert('There was an error fetching your accounts.')
            return
          }

          if (accs.length === 0) {
            window.alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctl" +
                        'y.')
            return
          }

          accounts = accs
          account = accounts[0]
        })
} else {
  console.warn('No web3 detected.')
  window.alert('You need an Ethereum web3 API to interact with this website. Try installing the ' +
            'MetaMask browser extension.')
}

const JournalClient = {
  getInstance (withInstance) {
    return new Promise((resolve, reject) => {
      OpenJournal
                .deployed()
                .then(instance => resolve(instance))
                .catch(e => {
                  console.log(e)
                  if (reject) {
                    reject(e)
                  };
                })
    })
  },
  getPaper (id) {
    return JournalClient
            .getInstance()
            .then(instance => {
              return instance
                    .getPaper
                    .call(id)
            })
            .then(paper => {
              return new Paper({
                id: id,
                title: paper[1].valueOf(),
                author: paper[0].valueOf(),
                reviewCount: paper[2].valueOf()
              })
            })
  },
  getPapers () {
    return JournalClient
            .getPaperCount()
            .then(count => {
              const ids = Array.from(Array(count).keys())
              const getPapers = ids.map(JournalClient.getPaper)
              return Promise.all(getPapers)
            })
  },
  getPaperCount () {
    return JournalClient
            .getInstance()
            .then(instance => {
              return instance
                    .getPaperCount
                    .call()
            })
            .then(count => {
              return parseInt(count.valueOf())
            })
  },
  uploadPaper (title) {
    return JournalClient
            .getInstance()
            .then(instance => {
              return instance.uploadPaper(title, { from: account })
            })
  },
  reviewPaper (id) {
    return JournalClient
            .getInstance()
            .then(instance => {
              return instance.reviewPaper(id, { from: account })
            })
  }
}

export default JournalClient
