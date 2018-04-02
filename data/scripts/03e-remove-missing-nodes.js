const fs = require('fs');
const jf = require('jsonfile');
const d3 = require('d3');
const _ = require('lodash');

// use in a pipeline with other processing scripts
const inputFile = 'readme-blocks-graph-no-self-links-no-null-nodes-no-solitary-nodes.json';

const inputFileStem = inputFile.slice(0, -5); // without the .json
const filePathStem = `../gist-metadata/output/`;
const filePath = `${filePathStem}${inputFile}`;
fs.readFile(filePath, 'utf-8',  callback);

function callback(error, data) {
  const parsed = JSON.parse(data);
  removeMissingNodes(parsed);
}

function removeMissingNodes(inputGraphContainer) {
  const graphContainer = _.cloneDeep(inputGraphContainer);
  const nodesHash = {};

  // construct nodesHash
  graphContainer.graph.nodes.forEach((node, i) => {
    nodesHash[node.id] = true;
  });

  // exclude links that reference unknown nodes
  graphContainer.graph.links = graphContainer.graph.links
    .filter(({ source, target }) => [source, target].every(id => nodesHash.hasOwnProperty(id)));

  console.log(`${inputGraphContainer.graph.links.length - graphContainer.graph.links.length} links that refer to missing nodes removed`);
  console.log('now there are:');
  console.log(`${graphContainer.graph.nodes.length} nodes`);
  console.log(`${graphContainer.graph.links.length} links`);
  console.log(`in the D3 README graph`);
  
  const outputFile = `${filePathStem}${inputFileStem}-no-missing-nodes.json`;
  const outputJsonObj = graphContainer;
  jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
    console.log(err)
  })
} 
