var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

// const inputFile = 'readme-blocks-graph.json';
const inputFile = 'readme-blocks-graph.json';
const inputFileStem = inputFile.slice(0, -5); // without the .json
const filePathStem = `../gist-metadata/output/`;
const filePath = `${filePathStem}${inputFile}`;
fs.readFile(filePath, 'utf-8',  callback);

function callback(error, data) {
	const parsed = JSON.parse(data);
	removeSelfLinks(parsed);
};

function removeSelfLinks(inputGraphContainer) {
	const selfLinksIndices = [];

	const graphContainer = _.cloneDeep(inputGraphContainer);
	// console.log(Object.keys(graphContainer));
	// console.log(Object.keys(graphContainer.graph));
	graphContainer.graph.links.forEach((link, i) => {
		if (link.source === link.target) {
			selfLinksIndices.push(i);
		} 
	});

	selfLinksIndices.forEach(index => {
		if (index > -1) {
    	graphContainer.graph.links.splice(index, 1);
		}
	})

	console.log(`${selfLinksIndices.length} self-links removed`);
	console.log('now there are:');
	console.log(`${graphContainer.graph.nodes.length} nodes`);
	console.log(`${graphContainer.graph.links.length} links`);
	console.log(`in the D3 README graph`);
	

	// const outputFile = '../gist-metadata/output/readme-blocks-graph-no-self-links.json'
	const outputFile = `${filePathStem}${inputFileStem}-no-self-links.json`
	const outputJsonObj = graphContainer;
	jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
	  console.log(err)
	})
} 
