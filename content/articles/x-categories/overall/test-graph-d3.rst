Test graph d3.js
==================================================

:slug: test-graph-d3
:summary: 
:tags: Amenity
:category: Graph
:status: draft 


.. figure:: /images/graphs/graph-url-test-3.svg
	:alt: graph-url-test-3
	:figwidth: 100%

	
	Graph caption
	
	- i1: build cities better A

	- i2: build cities better B

	- i3: build cities better C

.. raw:: html

	<!DOCTYPE html>
	<meta charset="utf-8">

	<style>
		.node {
		  stroke: #fff;
		  stroke-width: 1.5px;
	}

		.link {
		  fill: none;
		  stroke: #bbb;
	}
	</style>

	<body>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
	<script>

	var width = 600,
	    height = 400;

	var color = d3.scale.category20();

	var force = d3.layout.force()
	    .linkDistance(10)
	    .linkStrength(2)
	    .size([width, height]);

	var svg = d3.select("body").append("svg")
	    .attr("width", width)
	    .attr("height", height);

	d3.json("/images/json/miserables.json", function(error, graph) {
	  if (error) throw error;

	  var nodes = graph.nodes.slice(),
	      links = [],
	      bilinks = [];

	  graph.links.forEach(function(link) {
	    var s = nodes[link.source],
	        t = nodes[link.target],
	        i = {}; // intermediate node
	    nodes.push(i);
	    links.push({source: s, target: i}, {source: i, target: t});
	    bilinks.push([s, i, t]);
	  });

	  force
	      .nodes(nodes)
	      .links(links)
	      .start();

	  var link = svg.selectAll(".link")
	      .data(bilinks)
	    .enter().append("path")
	      .attr("class", "link");

	  var node = svg.selectAll(".node")
	      .data(graph.nodes)
	    .enter().append("circle")
	      .attr("class", "node")
	      .attr("r", 20)
	      .style("fill", function(d) { return color(d.group); })
	      .call(force.drag);

	  node.append("title")
	      .text(function(d) { return d.name; });

	  force.on("tick", function() {
	    link.attr("d", function(d) {
	      return "M" + d[0].x + "," + d[0].y
	          + "S" + d[1].x + "," + d[1].y
	          + " " + d[2].x + "," + d[2].y;
	    });
	    node.attr("transform", function(d) {
	      return "translate(" + d.x + "," + d.y + ")";
	    });
	  });
	});

	</script>


