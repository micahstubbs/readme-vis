const fs = require('fs');
const jf = require('jsonfile');
const d3 = require('d3');
const _ = require('lodash');

const inputFile = 'readme-blocks-graph.json';
const inputFileStem = inputFile.slice(0, -5); // without the .json
const filePathStem = `../gist-metadata/output/`;
const filePath = `${filePathStem}${inputFile}`;
fs.readFile(filePath, 'utf-8',  callback);

function callback(error, data) {
	const parsed = JSON.parse(data);
	removeSelfLinks(parsed);
}

function removeSelfLinks(inputGraphContainer) {
	const graphContainer = _.cloneDeep(inputGraphContainer);

	// exclude self-referencing links
	graphContainer.graph.links = graphContainer.graph.links
		.filter(({ source, target }) => source !== target);

	console.log(`${inputGraphContainer.graph.links.length - graphContainer.graph.links.length} self-links removed`);
	console.log('now there are:');
	console.log(`${graphContainer.graph.nodes.length} nodes`);
	console.log(`${graphContainer.graph.links.length} links`);
	console.log(`in the D3 README graph`);

	const outputFile = `${filePathStem}${inputFileStem}-no-self-links.json`;
	const outputJsonObj = graphContainer;
	jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
	  console.log(err)
	})
} 
