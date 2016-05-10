var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

"use strict";

var blocksData = JSON.parse(fs.readFileSync('../gist-metadata/input/blocks.json', 'utf-8'));
//console.log("withReadme", withReadme);

var thumbnailsHash = {};

// blocksData.some(function(d, i) {
// 	console.log('d', d)
// 	if (i > 10) return true;
// })

blocksData.forEach(function(d, i) {
	thumbnailsHash[d.id] = d.thumbnail;
})

var outputFile = '../gist-metadata/output/thumbnailsHash.json'

var outputJsonObj = thumbnailsHash;

jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
  console.log(err)
})
