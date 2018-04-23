const fs = require('fs');
const jf = require('jsonfile');
const d3 = require('d3');
const _ = require('lodash');

// use in a pipeline with other processing scripts
const inputFile = 'readme-blocks-graph-no-self-links-no-null-nodes.json';

const inputFileStem = inputFile.slice(0, -5); // without the .json
const filePathStem = `../gist-metadata/output/`;
const filePath = `${filePathStem}${inputFile}`;
fs.readFile(filePath, 'utf-8',  callback);

function callback(error, data) {
	const parsed = JSON.parse(data);
	removeSolitaryNodes(parsed);
}

function removeSolitaryNodes(inputGraphContainer) {
	const graphContainer = _.cloneDeep(inputGraphContainer);
	const linksHash = {};

	// construct linksHash
	graphContainer.graph.links.forEach((link, i) => {
		linksHash[link.source] = true;
		linksHash[link.target] = true;
	});

	// exclude solo nodes
	graphContainer.graph.nodes = graphContainer.graph.nodes
		.filter(node => linksHash.hasOwnProperty(node.id));

	console.log(`${inputGraphContainer.graph.nodes.length - graphContainer.graph.nodes.length} solitary nodes removed`);
	console.log('now there are:');
	console.log(`${graphContainer.graph.nodes.length} nodes`);
	console.log(`${graphContainer.graph.links.length} links`);
	console.log(`in the D3 README graph`);
	
	const outputFile = `${filePathStem}${inputFileStem}-no-solitary-nodes.json`;
	const outputJsonObj = graphContainer;
	jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
	  console.log(err)
	})
} 
