const fs = require('fs');
const jf = require('jsonfile');
const d3 = require('d3');
const _ = require('lodash');

// use in a pipeline with other processing scripts
const inputFile = 'readme-blocks-graph-no-self-links.json';

const inputFileStem = inputFile.slice(0, -5); // without the .json
const filePathStem = `../gist-metadata/output/`;
const filePath = `${filePathStem}${inputFile}`;
fs.readFile(filePath, 'utf-8',  callback);

function callback(error, data) {
	const parsed = JSON.parse(data);
	removeNullNodes(parsed);
}

function removeNullNodes(inputGraphContainer) {
	const graphContainer = _.cloneDeep(inputGraphContainer);

	// exclude null nodes
	graphContainer.graph.nodes = graphContainer.graph.nodes
		.filter(node => node.user);

	console.log(`${inputGraphContainer.graph.nodes.length - graphContainer.graph.nodes.length} null nodes removed`);
	console.log('now there are:');
	console.log(`${graphContainer.graph.nodes.length} nodes`);
	console.log(`${graphContainer.graph.links.length} links`);
	console.log(`in the D3 README graph`);
	
	const outputFile = `${filePathStem}${inputFileStem}-no-null-nodes.json`;
	const outputJsonObj = graphContainer;
	jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
	  console.log(err)
	})
} 
