const fs = require('fs');
const jf = require('jsonfile')
const d3 = require('d3');
const _ = require('lodash');

// use in a pipeline with other processing scripts
const inputFile = 'readme-blocks-graph-no-self-links-no-solitary-nodes-no-missing-nodes.json';

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
  

  const graphContainer = _.cloneDeep(inputGraphContainer);
  // console.log(Object.keys(graphContainer));
  // console.log(Object.keys(graphContainer.graph));
  const undirectedLinksHash = {};
  const redundantLinkIndices = [];

  graphContainer.graph.links.forEach((link, i) => {
    const sourceTarget = [link.source, link.target];

    // sort so that links with different direction become the same
    const sortedSourceTarget = sourceTarget.sort();

    // make a string that we can use as a key
    const sortedSourceTargetString = sortedSourceTarget.join();

    // see if we have seen this sortedSourceTargetString before
    if (typeof undirectedLinksHash[sortedSourceTargetString] === 'undefined') {
      // if we have not seen it before, add a value for it
      undirectedLinksHash[sortedSourceTargetString] = true;
    } else {
      // if we have seen it before, note the index of the current link
      // so that we can remove it later
      redundantLinkIndices.push(i);
    }
  });

  // remove the redundant links from the links array
  redundantLinkIndices.forEach(index => {
    if (index > -1) {
      graphContainer.graph.links.splice(index, 1);
    }
  });

  console.log(`${redundantLinkIndices.length} redundant links removed`);
  console.log('now there are:');
  console.log(`${graphContainer.graph.nodes.length} nodes`);
  console.log(`${graphContainer.graph.links.length} links`);
  console.log(`in the D3 README graph`);
  
  const outputFile = `${filePathStem}${inputFileStem}-no-redudant-links.json`
  const outputJsonObj = graphContainer;
  jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
    console.log(err)
  })
} 
