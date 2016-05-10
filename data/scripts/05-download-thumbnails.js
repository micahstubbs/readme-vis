var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');
var request = require('request');
var http = require('http');

"use strict";

var thumbnailsHash = JSON.parse(fs.readFileSync('../gist-metadata/output/thumbnailsHash.json', 'utf-8'));
var DOWNLOAD_DIR = '../thumbnails/';
var thumbnailUrl;

// for (var property in thumbnailsHash) {
//     if (thumbnailsHash.hasOwnProperty(property)) {
//         // do stuff
//         thumbnailUrl = thumbnailsHash[property];
// 
//     }
// }
request.get('https://gist.githubusercontent.com/mbostock/582915/raw/3fb6b87364651456c68b4d8b8b0fc2e8ae65bf66/thumbnail.png')


getFile();
// var outputFile = '../gist-metadata/output/thumbnailsHash.json'
// 
// var outputJsonObj = thumbnailsHash;
// 
// jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
//   console.log(err)
// })
