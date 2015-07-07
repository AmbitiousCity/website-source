var width = 500,
    height = 300;

var color = d3.scale.category20();

var force = d3.layout.force()
    .linkDistance(10)
    .linkStrength(2)
    .size([width, height]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// var test = -5;

d3.json("/images/json/graph-LATEST.json", function(error, graph) {
    if (error) throw error;

    var nodes = graph.nodes,
        links = [], //create an empty array
        bilinks = [];

    //1st step: make an associative array of nodes--to refer to node objects by id
    var nodesDict = {};
    nodes.forEach(function(n) {
        nodesDict[n.id] = n; //key => node.id; value => node
    });

    //2nd step: process each link
    graph.links.forEach(function(link) {
        var s = nodesDict[link.sourceId],
            t = nodesDict[link.targetId],
            i = {}; //intermediate node

        nodes.push(i);
        links.push({
            source: s,
            target: i
        }, {
            source: i,
            target: t
        });
        bilinks.push([s, i, t]);
    });

    //original:
    // graph.links.forEach(function(link) {
    //     var s = nodes[link.source],
    //         t = nodes[link.target],
    //         i = {}; // intermediate node
    //     nodes.push(i);
    //     links.push({
    //         source: s,
    //         target: i
    //     }, {
    //         source: i,
    //         target: t
    //     });
    //     bilinks.push([s, i, t]);
    // });

    force
        .nodes(nodes)
        .links(links)
        .start();

    var link = svg.selectAll(".link")
        .data(bilinks)
        .enter().append("path")
        .attr("class", "link");

    var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 20)
        .style("fill", function(d) {
            return color(d.group);
        })
        .call(force.drag);

    node.append("title")
        .text(function(d) {
            return d.name;
        });

    force.on("tick", function() {
        link.attr("d", function(d) {
            return "M" + d[0].x + "," + d[0].y + "S" + d[1].x + "," + d[1].y + " " + d[2].x + "," + d[2].y;
        });
        node.attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    });
});
