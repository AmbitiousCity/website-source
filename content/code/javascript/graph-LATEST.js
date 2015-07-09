var width = 500,
    height = 300;

var color = d3.scale.category10();

var force = d3.layout.force()
    .linkDistance(100) //distance we desire between connected nodes; greater the number, nodes farther apart
    // link distance is the expected distance between nodes => http://stackoverflow.com/questions/17355128/relation-between-linkdistance-and-linkstrength-in-d3-js-force-layout
    .linkStrength(1) //link strength as the speed at which you want to reach target distance on each iteration.
    .charge(-250) //lower the number, nodes farther apart; 
    //negative charge values indicate repulsion, which is generally desirable for force-directed graphs
    .size([width, height]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

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
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) {
            return Math.sqrt(d.value);
        });

    var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 15)
        .style("fill", function(d) {
            return color(d.group);
        })
        .call(force.drag);

    node.append("title")
        .text(function(d) {
            return d.name;
        });

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
