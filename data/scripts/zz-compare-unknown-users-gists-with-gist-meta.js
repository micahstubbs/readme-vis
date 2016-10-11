var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

// var withReadme = JSON.parse(fs.readFileSync('../gist-metadata/output/gists-with-readme.json', 'utf-8'));
// var userLookup = JSON.parse(fs.readFileSync('../gist-metadata/output/gist-id-to-username.json', 'utf-8'));

const file1 = '/users/m/workspace/blockbuilder-search-index/data/gist-meta.json';
const file2 = '../gist-metadata/output/gists-with-unknown-users.json';

fs.readFile(file1, 'utf8', callback1);
function callback1(error, data1) {
  fs.readFile(file2, 'utf-8', callback2.bind(data1));
}
function callback2(error, data2) {
  const data1 = this;
  const parsed1 = JSON.parse(data1);
  const parsed2 = JSON.parse(data2);
  ready(parsed1, parsed2);
}

//console.log('withReadme', withReadme);

function ready(gistMeta, gistsWithUnknownUsers) {
  const foundInGistMeta = [];

  gistMeta.forEach(d => {
    gistsWithUnknownUsers.forEach(e => {
        if (d.id == e) {
          foundInGistMeta.push(e);
        }
    })
  })

  console.log(`${gistsWithUnknownUsers.length} gists with unknown users`);
  console.log('of those gists,')
  console.log(`${foundInGistMeta.length} gists found in gist-meta.json`);

  // var outputFile = '../gist-metadata/output/gists-with-readme-with-blocks-links.json'
  // var outputJsonObj = withBlocksLinks;
  // jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
  //   console.log(err)
  // })
}

