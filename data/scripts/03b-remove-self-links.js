var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

fs.readFile('../gist-metadata/output/readme-blocks-graph.json', 'utf-8',  callback);

function callback(error, data) {
	const parsed = JSON.parse(data);
	removeSelfEdges(parsed);
};

function removeSelfEdges(inputGraphContainer) {
	const selfEdgesIndices = [];

	const graphContainer = _.cloneDeep(inputGraphContainer);
	console.log(Object.keys(graphContainer));
	console.log(Object.keys(graphContainer.graph));
	graphContainer.graph.links.forEach((link, i) => {
		if (link.source === link.target) {
			selfEdgesIndices.push(i);
		} 
	});

	selfEdgesIndices.forEach(index => {
		if (index > -1) {
    	graphContainer.graph.links.splice(index, 1);
		}
	})

	const outputFile = '../gist-metadata/output/readme-blocks-graph-no-self-links.json'
	const outputJsonObj = graphContainer;
	jf.writeFile(outputFile, outputJsonObj, {spaces: 2}, function(err){
	  console.log(err)
	})
} 


