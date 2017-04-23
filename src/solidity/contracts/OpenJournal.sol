pragma solidity ^0.4.2;

contract OpenJournal {

	struct Paper {
		address author;
		string content;
		uint reviewerCount;
		address[] reviewers;
	}

	Paper[] papers;	
	
    function uploadPaper(string content) returns(bool) {
		var paper = Paper(msg.sender, content, 0, new address[](0));
		papers.push(paper);

		return true;
	}

	function reviewPaper(uint id) returns(bool) {
		papers[id].reviewerCount ++;

		return true;
	}

	function getPaperCount() returns(uint) {
		return papers.length;
	}

	function getPaper(uint id) returns(address author, string content, uint reviewerCount) {
		author = papers[id].author;
		content = papers[id].content;
		reviewerCount = papers[id].reviewerCount;
	}

	// uint[] ids;
	// function getUnpublished() returns(uint[]) {
	// 	ids = new uint[](0);
	// 	for (var i = 0; i < papers.length; i++) {
	// 		if (papers[i].author == msg.sender && !isPublished(papers[i])) {
	// 			ids.push(i);
	// 		}
    //     }
	// 	return ids;
	// }

	// function getPublished() returns(uint[]) {
	// 	ids = new uint[](0);
	// 	for (var i = 0; i < papers.length; i++) {
	// 		if (papers[i].author == msg.sender && isPublished(papers[i])) {
	// 			ids.push(i);
	// 		}
    //     }
	// 	return ids;
	// }

	// function isPublished(Paper paper) private returns(bool) {
	// 	return paper.reviewerCount > 0;
	// }
}
