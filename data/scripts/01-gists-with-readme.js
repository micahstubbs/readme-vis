var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

"use strict";

var data = JSON.parse(fs.readFileSync('../gist-metadata/input/files-blocks.json', 'utf-8'));

var sample = []; 

var withReadme = data.filter(function(d) {
	return d["fileName"].toLowerCase() === "readme.md"; 
})

// filter out size 0 README.md files
withReadme = withReadme.filter(function(d) {
	return d["file"]["size"] > 0;
})

/*
console.log("withReadme", withReadme);

withReadme.some(function(d, i) {
	sample.push(withReadme[i])
	// get 3 values and then stop
	if(i > 1) { return true }
})
*/

console.log(withReadme.length + " README.md files in the d3 gists corpus")
var outputFile = '../gist-metadata/output/gists-with-readme.json'

var outputJsonObj = withReadme;

jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
  console.log(err)
})
