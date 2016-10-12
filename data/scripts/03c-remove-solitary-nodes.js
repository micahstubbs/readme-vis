var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

// const inputFile = 'readme-blocks-graph.json';
const inputFile = 'readme-blocks-graph-no-self-links.json';
const inputFileStem = inputFile.slice(0, -5); // without the .json
const filePathStem = `../gist-metadata/output/`;
const filePath = `${filePathStem}${inputFile}`;
fs.readFile(filePath, 'utf-8',  callback);

function callback(error, data) {
	const parsed = JSON.parse(data);
	removeSolitaryNodes(parsed);
};

function removeSolitaryNodes(inputGraphContainer) {
	const solitaryNodesIndices = [];

	const graphContainer = _.cloneDeep(inputGraphContainer);
	// console.log(Object.keys(graphContainer));
	// console.log(Object.keys(graphContainer.graph));
	const linksHash = {};

	// construct linksHash
	graphContainer.graph.links.forEach((link, i) => {
		linksHash[link.source] = true;
		linksHash[link.target] = true;
	});

	graphContainer.graph.nodes.forEach((node, i) => {
		if (typeof linksHash[node.id] === 'undefined') {
			solitaryNodesIndices.push(i);
		}
	});

	solitaryNodesIndices.forEach(index => {
		if (index > -1) {
    	graphContainer.graph.nodes.splice(index, 1);
		}
	});

	console.log(`${solitaryNodesIndices.length} solitary nodes removed`);
	console.log('now there are:');
	console.log(`${graphContainer.graph.nodes.length} nodes`);
	console.log(`${graphContainer.graph.links.length} links`);
	console.log(`in the D3 README graph`);
	
	const outputFile = `${filePathStem}${inputFileStem}-no-solitary-nodes.json`
	const outputJsonObj = graphContainer;
	jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
	  console.log(err)
	})
} 
