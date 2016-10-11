var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');


var data = JSON.parse(fs.readFileSync('../gist-metadata/input/blocks.json', 'utf-8'));
// const datum = data[200];
// console.log('datum', datum);
// 
// const user = datum.owner.login;
// console.log('user', user);

data.forEach(d => {
  if (d.id === '58a58d40cf92d73370e60f915c940ff1') {
    console.log('d', d);
  }
})

// var outputFile = '../gist-metadata/output/blocks-sample.json'
// var outputJsonObj = withBlocksLinks;
// jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
//   console.log(err)
// })
