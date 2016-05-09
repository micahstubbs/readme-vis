var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

"use strict";

var withReadme = JSON.parse(fs.readFileSync('../gist-metadata/output/gists-with-readme.json', 'utf-8'));
//console.log("withReadme", withReadme);

var withBlocksLinks = [];

withReadme.some(function(d) {

	// some error handling 
	// var readmePath = "../gists/" + d["gistID"] + "readme.md"

	try {
		// get the README.md for this gist 
		var readmePath = "../all-the-gists/gists-files/" + d["gistId"] + "/" + d["fileName"];
		var readme = fs.readFileSync(readmePath, 'utf-8');

	} catch(e1) {
		console.log(e1);
	}
	

	var re = /bl\.ocks\.org/;

	// bl.ocks profiles and individual blocks
	var reUrl = /[^<>()\[\]"'#\s]*bl\.ocks\.org[^<>()\[\]"'#\s]*/g;

	// only individual blocks
	var reBlockUrl = /[^<>()\[\]"'#\s]*bl\.ocks\.org\/[^<>()\[\]"'\s]*\/[^<>()\[\]"'#\s]+/g;

	if(reBlockUrl.test(readme)) {
		//console.log(readme);

		// check for any bl.ocks.org links
		d["blocksLinked"] = readme.match(reBlockUrl); // an array of the bl.ocks.org links found in the README.md

		//console.log("d", d);

		withBlocksLinks.push(d);
	}


})

console.log(withReadme.length + " README.md files in the d3 gists corpus")
console.log("of those README.md files")
console.log(withBlocksLinks.length + " contain links to bl.ocks.org")

var outputFile = '../gist-metadata/output/gists-with-readme-with-blocks-links.json'

var outputJsonObj = withBlocksLinks;

jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
  console.log(err)
})
