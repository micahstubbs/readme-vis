const r = require('request');
const neo4jUrl = 'http://localhost:7474/db/data/transaction/commit';
const fs = require('fs');

const inputFile = '../readme-blocks-graph.json';
const json = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

function cypher(query, params, cb) {
  r.post(
    {
      uri: neo4jUrl,
      headers: {
        // change `bmVvNGo6YWRtaW4=` to match
        // the base64 the hash of your
        // neo4j username and password string
        // like this 'username:password'
        Authorization: 'Basic bmVvNGo6YWRtaW4='
      },
      json: { statements: [{ statement: query, parameters: params }] }
    },
    (err, res) => {
      cb(err, res.body);
    }
  );
}

const query =
  'WITH {json} as data UNWIND data.nodes as b MERGE (block:Block {id:b.id}) ON CREATE SET block.user = b.user, block.description = b.description';

cypher(query, { json }, (err, result) => {
  console.log(err, JSON.stringify(result));
});
