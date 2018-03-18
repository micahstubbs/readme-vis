# now let's update readme-blocks-graph.json
#
# first we copy over the blocks metadata from blockbuilder-search-index
# cd readme-vis
cp -r ../blockbuilder-search-index/data/parsed/ data/gist-metadata/input/
cd data/scripts
node 01-gists-with-readme.js
# 21589 README.md files in the d3 gists corpus
#
node 01b-gists-users.js
# wrote 29327 gist ID, github username key, value pairs
# see the results at ../gist-metadata/output/gist-id-to-username.json
#
node 02-gists-with-readme-with-blocks-link.js
# 0 gists with unknown users
# 151 gists with missing files or folders
# 21589 README.md files in the d3 gists corpus
# of those README.md files
# 10815 contain links to bl.ocks.org
#
node 03a-generate-graph.js
# 7911 nodes
# 25769 links
# in the D3 README graph
