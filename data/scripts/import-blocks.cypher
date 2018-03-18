WITH {json} as data
UNWIND data.nodes as b
MERGE (block:Block {id:b.id}) ON CREATE
  SET block.user = b.user, block.description = b.description
