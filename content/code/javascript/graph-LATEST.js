var width = 500,
    height = 300;

var color = d3.scale.category10();

//Set up the force layout
var force = d3.layout.force()
    .linkDistance(100) //distance we desire between connected nodes; greater the number, nodes farther apart
    // link distance is the expected distance between nodes => http://stackoverflow.com/questions/17355128/relation-between-linkdistance-and-linkstrength-in-d3-js-force-layout
    .linkStrength(1) //link strength as the speed at which you want to reach target distance on each iteration.
    .charge(-250) //lower the number, nodes farther apart; 
    //negative charge values indicate repulsion, which is generally desirable for force-directed graphs
    .size([width, height]);

//Append a SVG to the body of the html page. Assign this SVG as an object to var svg
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

//Read the data from the json data file
d3.json("/code/json/graph-LATEST.json", function(error, graph) {
    if (error) throw error;

    var nodes = graph.nodes,
        links = [];

    //1st step: make an associative array of nodes--to refer to node objects by id
    var nodesDict = {};
    nodes.forEach(function(n) {
        nodesDict[n.id] = n; //key => node.id; value => node
    });

    //2nd step: process each link
    graph.links.forEach(function(link) {
        var s = nodesDict[link.sourceId],
            t = nodesDict[link.targetId];

        links.push({
            source: s,
            target: t
        });
    });

    //Creates the graph data structure out of the json data
    force
        .nodes(nodes)
        .links(links)
        .start();

    //---Insert-------
    svg.append("defs").selectAll("marker")
        .data(["suit", "licensing", "resolved"])
        .enter().append("marker")
        .attr("id", function(d) {
            return d;
        })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 25)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
        .style("stroke", "#999")
        .style("opacity", "0.85");
    //---End Insert---

    //Create all the line svgs but without locations yet
    var link = svg.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .style("marker-end", "url(#suit)") // Modified line 
    ;
    // .attr("class", function(d) {
    //     return "link " + d.type;
    // })
    // .style("stroke-width", function(d) {
    //     return Math.sqrt(d.value);
    // })

    // .attr("marker-end", function(d) {
    //     return "url(#" + d.type + ")";
    // })



    //Do the same with the circles for the nodes
    var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 12)
        .style("fill", function(d) {
            return color(d.group);
        })
        .call(force.drag);

    node.append("title")
        .text(function(d) {
            return d.name;
        });



    //Give the SVGs co-ordinates - the force layout generates co-ordinates that this code uses to update the attributes of the SVG elements
    force.on("tick", function() {
        link.attr("x1", function(d) {
                return d.source.x;
            })
            .attr("y1", function(d) {
                return d.source.y;
            })
            .attr("x2", function(d) {
                return d.target.x;
            })
            .attr("y2", function(d) {
                return d.target.y;
            });

        node.attr("cx", function(d) {
                return d.x;
            })
            .attr("cy", function(d) {
                return d.y;
            });
    });

});
