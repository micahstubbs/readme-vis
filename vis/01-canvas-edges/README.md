a now-successful attempt to draw links with canvas paths so that the end of each link overlaps perfectly with the center of an svg circle we use to represent a node.

thanks to [@enjalot](https://twitter.com/enjalot) for pointing out that the CSS `body { margin: 0; }` would do the trick.

---

a clue: somehow the canvas links layer lines up nicely with the svg nodes layer in the iframe on [bl.ocks.org](bl.ocks.org) but doesn't at all when [it's all by itself on the page](http://bl.ocks.org/micahstubbs/raw/5246b8a643393f0753a11b98129a3237/) 🤔

a fork of [Blocks Graph I Readme Mentions](http://bl.ocks.org/micahstubbs/8a173cfcb9171627c7f1)

a simpler example of this `canvas for links, svg for nodes` network drawing technique is the bl.ock [Ch. 11, Fig. 10 - D3.js in Action](http://bl.ocks.org/emeeks/e330141d1279c6115a3a) from [emeeks](http://bl.ocks.org/emeeks)

