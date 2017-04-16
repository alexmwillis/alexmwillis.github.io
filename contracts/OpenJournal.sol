pragma solidity ^0.4.2;

contract OpenJournal {

	struct Paper {
		address author;
		string content;
		uint reviewerCount;
	}

	Paper[] papers;

	function uploadPaper(string content) returns(bool success) {
		var paper = Paper(msg.sender, content, 0);
		papers.push(paper);

		return true;
	}

	function reviewPaper(uint id) returns(bool success) {
		papers[id].reviewerCount ++;

		return true;
	}

	function getUnpublished() returns(uint) {
		var count = 0;
		for (var i = 0; i < papers.length; i++) {
			if (papers[i].author == msg.sender && !isPublished(papers[i])) {
				count ++;
			}
        }
		return count;
	}

	function getPublished() returns(uint) {
		var count = 0;
		for (var i = 0; i < papers.length; i++) {
			if (papers[i].author == msg.sender && isPublished(papers[i])) {
				count ++;
			}
        }
		return count;
	}

	function isPublished(Paper paper) private returns(bool) {
		return paper.reviewerCount > 0;
	}
}
