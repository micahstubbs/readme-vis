var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

"use strict";

var withReadme = JSON.parse(fs.readFileSync('../gist-metadata/gists-with-readme.json', 'utf-8'));
//console.log("withReadme", withReadme);

var withBlocksLinks = [];

withReadme.some(function(d) {

	// get the README.md for this gist
	var readmePath = "../gists/" + d["gistId"] + "/README.md"

	// some error handling 
	// var gistPath = "../gists/" + d["gistID"] + "readme.md"

	var readme = fs.readFileSync(readmePath, 'utf-8');

	var re = /bl\.ocks\.org/;

	if(re.test(readme)) {
		console.log(readme);

		return true;
	}


	// check for any bl.ocks.org links

	// if found, set hasBlocksLink to true and push the links to the blocksLinked array

	if(typeof hasBlocksLink !== "undefined") {
		d["blocksLinked"] = []; // an array of the bl.ocks.org links found in the README.md

		console.log("d", d);

		withBlocksLinks.push(d);
	}

})

console.log(withReadme.length + " README.md files in the d3 gists corpus")
console.log("of those README.md files")
console.log(withBlocksLinks.length + " contain links to bl.ocks.org")

var outputFile = '../gist-metadata/gists-with-readme-with-blocks-links.json'

var outputJsonObj = withBlocksLinks;

jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
  console.log(err)
})
