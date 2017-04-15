pragma solidity ^0.4.2;

contract OpenJournal {

	struct Paper {
		address author;
		string content;
		// address[] reviewers;
	}

	Paper[] papers;

	//event UploadPaper(address indexed _from, address indexed _to, uint256 _value);

	function uploadPaper(string content) returns(bool success) {
		// var reviewers = new address[]; 
		var paper = Paper(msg.sender, content);
		papers.push(paper);

		// if (balances[msg.sender] < amount) return false;
		// balances[msg.sender] -= amount;
		// balances[receiver] += amount;
		// Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getUnpublished() returns(uint) {
		var count = 0;
		for (var i = 0; i < papers.length; i++) {
			if (papers[i].author == msg.sender) {
				count ++;
			}
        }
		return count;
	}

	function getPublished() returns(uint) {
		var count = 0;
		for (var i = 0; i < papers.length; i++) {
			if (papers[i].author == msg.sender) {
				count ++;
			}
        }
		return count;
	}
}
