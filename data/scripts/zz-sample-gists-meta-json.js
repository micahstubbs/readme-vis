var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');


var data = JSON.parse(fs.readFileSync('/users/m/workspace/blockbuilder-search-index/data/gist-meta.json', 'utf-8'));
const datum = data[200];
console.log('datum', datum);



// var outputFile = '../gist-metadata/output/blocks-sample.json'
// var outputJsonObj = withBlocksLinks;
// jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
//   console.log(err)
// })
