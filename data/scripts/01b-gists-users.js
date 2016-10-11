var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');


var data = JSON.parse(fs.readFileSync('../gist-metadata/input/blocks.json', 'utf-8'));

// const datum = data[200];
// console.log('datum', datum);
// const user = datum.owner.login;
// console.log('user', user);

const gistIDuserLookup = {};

data.forEach(d => {
  gistIDuserLookup[d.id] = d.owner.login;
});

var outputFile = '../gist-metadata/output/gist-id-to-username.json'
var outputJsonObj = gistIDuserLookup;
jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
  console.log(err)
})

console.log(`wrote ${data.length} gist ID, github username key, value pairs`);
console.log(`see the results at ${outputFile}`);