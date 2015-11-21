var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

"use strict";

var withBlocksLinks = JSON.parse(fs.readFileSync('../gist-metadata/gists-with-readme-with-blocks-links.json', 'utf-8'));
//console.log("withReadme", withReadme);

// https://github.com/jsongraph/json-graph-specification
// following the 'nodes/edges single graph' spec

var graphContainer = {
   "graph": {
      "nodes": [],
      "edges": []
   }
}

var nodeHash = {};

withBlocksLinks.some(function(d) {

	checkNode(d["gistId"]);

	var reGistId = /(http\:\/\/)?bl\.ocks\.org\/[^<>()\[\]\/"'#\s]*\/(raw\/)?([^<>()\[\]\/"'#\s]*)/g;
	//var reGistIdRaw = /http\:\/\/bl\.ocks\.org\/[^<>()\[\]\/"'\s]*\/(raw\/)?([^<>()\[\]\/"'\s]*)/g;

	console.log(d["blocksLinked"])

	d["blocksLinked"].forEach(function(e) {

		console.log("blockLink mentioned in README.md", e);

		var matchGistId = reGistId.exec(e);
		console.log("matchGistId");
		console.log(matchGistId);

		var gistId = matchGistId[3];
		console.log("gistId found", gistId);
		checkNode(gistId)

		// http://stackoverflow.com/a/11477448/1732222
		reGistId.lastIndex = 0;

		var readmeGistId 		= d["gistId"]; // from the parent gist that contains the README.md
		var blockLinkGistId = gistId; 		 // parsed from the link found in the README.md

		graphContainer["graph"]["edges"].push({
			"source": readmeGistId,
			"target": blockLinkGistId,

		})

		

	})

/*
	// match the username inside of a gist raw_url
	var reUser = /https\:\/\/gist\.githubusercontent\.com\/([^<>()\[\]\/"'\s]*)\//g;

	var raw_url = d["file"]["raw_url"]

	var matchUser = reUser.exec(raw_url);
	//console.log(matchUser[1]);
	var user = matchUser[1];
*/

})

// check if the node has been seen before
// if not, add it to the nodes list in our graph object
function checkNode(node) {
	if(typeof nodeHash[node] === "undefined") {
		nodeHash[node] = true;
		graphContainer["graph"]["nodes"].push({
			"id": node
		})
	}	
}
/*
console.log(withReadme.length + " README.md files in the d3 gists corpus")
console.log("of those README.md files")
console.log(withBlocksLinks.length + " contain links to bl.ocks.org")
*/
var outputFile = '../gist-metadata/readme-blocks-graph.json'

var outputJsonObj = graphContainer;

jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
  console.log(err)
})

