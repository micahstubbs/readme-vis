var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

// use in a pipeline with other processing scripts
const inputFile = 'readme-blocks-graph-no-self-links-no-solitary-nodes.json';

// use standalone from the original readme graph
// const inputFile = 'readme-blocks-graph.json'
const inputFileStem = inputFile.slice(0, -5); // without the .json
const filePathStem = `../gist-metadata/output/`;
const filePath = `${filePathStem}${inputFile}`;
fs.readFile(filePath, 'utf-8',  callback);

function callback(error, data) {
  const parsed = JSON.parse(data);
  removeMissingNodes(parsed);
};

function removeMissingNodes(inputGraphContainer) {
  const linksWithMissingNodeIndices = [];

  const graphContainer = _.cloneDeep(inputGraphContainer);
  // console.log(Object.keys(graphContainer));
  // console.log(Object.keys(graphContainer.graph));
  const nodesHash = {};

  // construct nodesHash
  graphContainer.graph.nodes.forEach((node, i) => {
    nodesHash[node.id] = true;
  });

  // see if a link references something not in graph.nodes
  graphContainer.graph.links.forEach((link, i) => {
    ['source', 'target'].forEach(linkType => {
      if (typeof nodesHash[link.linkType] === 'undefined') {
        linksWithMissingNodeIndices.push(i);
      }
    })
  });



  linksWithMissingNodeIndices.forEach(index => {
    if (index > -1) {
      graphContainer.graph.links.splice(index, 1);
    }
  });

  console.log(`${linksWithMissingNodeIndices.length} links that refer to missing nodes removed`);
  console.log('now there are:');
  console.log(`${graphContainer.graph.nodes.length} nodes`);
  console.log(`${graphContainer.graph.links.length} links`);
  console.log(`in the D3 README graph`);
  
  const outputFile = `${filePathStem}${inputFileStem}-no-missing-nodes.json`
  const outputJsonObj = graphContainer;
  jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
    console.log(err)
  })
} 
