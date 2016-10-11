var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

// var withReadme = JSON.parse(fs.readFileSync('../gist-metadata/output/gists-with-readme.json', 'utf-8'));
// var userLookup = JSON.parse(fs.readFileSync('../gist-metadata/output/gist-id-to-username.json', 'utf-8'));

const file1 = '../gist-metadata/output/gists-with-readme.json';
const file2 = '../gist-metadata/output/gist-id-to-username.json';

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

function ready(withReadme, userLookup) {
  console.log('withReadme', withReadme);
  console.log('userLookup', userLookup);

  var withBlocksLinks = [];
  const unknownUsersGists = [];
  const missingFilesGists = [];

  withReadme.some(function(d) {
    // some error handling 
    // var readmePath = '../gists/' + d['gistID'] + 'readme.md'
    const gistId = d['gistId'];
    let username = userLookup[gistId];
    
    const fileName = d['fileName']
    if (typeof username === 'undefined') {
      console.log('gistId', gistId);
      console.log('username', username);
      unknownUsersGists.push(gistId);
    };

    try {
     // get the README.md for this gist 
     // var readmePath = '../all-the-gists/gists-files/' + d['gistId'] + '/' + d['fileName'];
     var readmePath = `/users/m/workspace/blockbuilder-search-index/data/gists-clones/${username}/${gistId}/${fileName}`;
     var readme = fs.readFileSync(readmePath, 'utf-8');
    } catch(e1) {
     console.log(e1);
     missingFilesGists.push(gistId);
    }
    var re = /bl\.ocks\.org/;
    // bl.ocks profiles and individual blocks
    var reUrl = /[^<>()\[\]''#\s]*bl\.ocks\.org[^<>()\[\]''#\s]*/g;
    // only individual blocks
    var reBlockUrl = /[^<>()\[\]''#\s]*bl\.ocks\.org\/[^<>()\[\]''\s]*\/[^<>()\[\]''#\s]+/g;
    if(reBlockUrl.test(readme)) {
     //console.log(readme);
     // check for any bl.ocks.org links
     d['blocksLinked'] = readme.match(reBlockUrl); // an array of the bl.ocks.org links found in the README.md
     //console.log('d', d);
     withBlocksLinks.push(d);
    }
  })

  console.log(`${unknownUsersGists.length} gists with unknown users`);
  console.log(`${missingFilesGists.length} gists with missing files or folders`);
  console.log(withReadme.length + ' README.md files in the d3 gists corpus')
  console.log('of those README.md files')
  console.log(withBlocksLinks.length + ' contain links to bl.ocks.org')


  var outputFile = '../gist-metadata/output/gists-with-readme-with-blocks-links.json'
  var outputJsonObj = withBlocksLinks;
  jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
    console.log(err)
  })

  outputFile = '../gist-metadata/output/gists-with-unknown-users.json'
  var outputJsonObj = unknownUsersGists;
  jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
    console.log(err)
  })

  outputFile = '../gist-metadata/output/gists-with-missing-files.json'
  var outputJsonObj = missingFilesGists;
  jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
    console.log(err)
  })
}

