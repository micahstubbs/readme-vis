var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

"use strict";

var withBlocksLinks = JSON.parse(fs.readFileSync('../gist-metadata/output/gists-with-readme-with-blocks-links.json', 'utf-8'));
var blockAttributes = JSON.parse(fs.readFileSync('../gist-metadata/input/blocks.json', 'utf-8'));
//console.log("withReadme", withReadme);

// check the format of our blockAttributes object
//blockAttributes.some(function(d, i) {
//	console.log(d);
//	if(i < 3) { return true }
//})

var blockAttributesById = {};
blockAttributes.forEach(function(d, i) {
	blockAttributesById[d["id"]] = d; 
})

//console.log("blockAttributesById", blockAttributesById);

// check the format of our blockAttributesById object
// log out three example blockAttributesById entries
var i = 0;
for(var key in blockAttributesById) {
	//console.log("gistId", key)
  //console.log(blockAttributesById[key]);
  //console.log("")
  i++;
  if(i>=3) {break};
}

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

	//checkNode(d["gistId"], d);

	var reGistId = /(http\:\/\/)?bl\.ocks\.org\/[^<>()\[\]\/"'#\s]*\/(raw\/)?([^<>()\[\]\/"'#\s]*)/g;
	//var reGistIdRaw = /http\:\/\/bl\.ocks\.org\/[^<>()\[\]\/"'\s]*\/(raw\/)?([^<>()\[\]\/"'\s]*)/g;

	//console.log(d["blocksLinked"])

	d["blocksLinked"].forEach(function(e) {

		//console.log("blockLink mentioned in README.md", e);

		var matchGistId = reGistId.exec(e);
		//console.log("matchGistId");
		//console.log(matchGistId);

		var gistId = matchGistId[3];
		//console.log("gistId found", gistId);
		checkNode(gistId, d)

		// http://stackoverflow.com/a/11477448/1732222
		reGistId.lastIndex = 0;

		var readmeGistId 		= d["gistId"]; // from the parent gist that contains the README.md
		var blockLinkGistId = gistId; 		 // parsed from the link found in the README.md

		graphContainer["graph"]["edges"].push({
			"source": readmeGistId,
			"target": blockLinkGistId,

		})		

	})

})

// check if the node has been seen before
// we identify the node using it's id
// if not, add it to the nodes list in our graph object
function checkNode(node, d) {
	if(typeof nodeHash[node] === "undefined") {
		nodeHash[node] = true;

		//console.log("node", node)	
		if(typeof blockAttributesById[node] !== "undefined") {
			var user = blockAttributesById[node]["owner"]["login"];
			var createdAt = blockAttributesById[node]["created_at"];
			var updatedAt = blockAttributesById[node]["updated_at"];
			var description = blockAttributesById[node]["description"];
		}	else {
			var user = null;
			var createdAt = null;
			var updatedAt = null;
			var description = null;
		}
		graphContainer["graph"]["nodes"].push({
			"id": node,
			"user": user,
			"createdAt": createdAt,
			"updatedAt": updatedAt,
			"description": description
		})
	}	
}
/*
console.log(withReadme.length + " README.md files in the d3 gists corpus")
console.log("of those README.md files")
console.log(withBlocksLinks.length + " contain links to bl.ocks.org")
*/
var outputFile = '../gist-metadata/output/readme-blocks-graph.json'

var outputJsonObj = graphContainer;

jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
  console.log(err)
})

