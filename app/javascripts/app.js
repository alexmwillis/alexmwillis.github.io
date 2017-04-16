// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'

import openJournal_artifacts from '../../build/contracts/OpenJournal.json'

var OpenJournal = contract(openJournal_artifacts);

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
}

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

var OpenJournalApi = {
  callContract(withInstance, withReturnValue, withError) {
    OpenJournal.deployed()
      .then(function (instance) { return withInstance(instance); })
      .then(function (value) { withReturnValue(value) })
      .catch(function (e) {
        console.log(e);
        withError(e);
      });
  },
  getPapers(withPaper) {
    this.getPaperCount(count => {
      for (var i = 0; i < count; i++) {
        this.getPaper(i, withPaper);
      }
    }, (e) => setStatus('failed to get papers'));
  },
  getPaper(id, withPaper) {
    this.callContract(instance => {
      return instance.getPaper.call(id)
    }, paper => {
      withPaper(paper);
    }, (e) => setStatus('failed to get paper'));
  },
  getPaperCount(withCount) {
    this.callContract(instance => {
      return instance.getPaperCount.call();
    }, count => {
      withCount(count);
    }, (e) => setStatus('failed to get paper count'));
  },
  reviewPaper(id, onSuccess) {
    this.callContract(instance => {
      return instance.reviewPaper(id, { from: account });
    }, () => {
      setStatus("paper reviewed");
      onSuccess();
    }, (e) => setStatus('failed to review paper'));
  },
  uploadPaper(paper, onSuccess) {
    this.callContract(instance => {
      return instance.uploadPaper(paper, { from: account });
    }, () => {
      setStatus("paper uploaded");
      onSuccess();
    }, (e) => setStatus('failed to uploaded paper'));
  }
};

window.App = {
  start: function () {
    var self = this;

    OpenJournal.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

      self.refresh();
    });
  },

  refresh: function () {
    var self = this;

    var papers = document.getElementById("papers");
    while (papers.hasChildNodes()) {
      papers.removeChild(papers.lastChild);
    }

    OpenJournalApi.getPapers(paper => {
      var paperAsString = paper[0].valueOf() + ":" + paper[1].valueOf() + ":" + paper[2].valueOf()
      var ul = document.getElementById("papers");
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(paperAsString));
      ul.appendChild(li);
    });

    OpenJournalApi.getPaperCount(count => {
      var element = document.getElementById("paper-count")
      element.innerHTML = count.valueOf();
    });
  },

  uploadPaper: function () {
    var self = this;

    var paper = document.getElementById("paper").value;

    setStatus("Initiating transaction... (please wait)");

    OpenJournalApi.uploadPaper(paper, () => { self.refresh(); });    
  },

  reviewPaper: function () {
    var self = this;

    var id = document.getElementById("id").value;

    setStatus("Initiating transaction... (please wait)");

    OpenJournalApi.reviewPaper(id, () => { self.refresh(); });
  }
};

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});
