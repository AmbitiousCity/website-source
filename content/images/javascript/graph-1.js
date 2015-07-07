var width = 600,
    height = 200;

var color = d3.scale.category20();

var force = d3.layout.force()
    .linkDistance(50)
    .linkStrength(10)
    .size([width, height]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("/images/json/sampleGraph1.json", function(error, graph) {
    if (error) throw error;

    var nodes = graph.nodes.slice(), //makes a copy of everything in graph (from file above)
        links = [], //creates an empty array
        bilinks = [];


    //1st step: make an associative array of nodes
    var nodesDict = function makeNodesDict(nodes) {
        var dict = {};
        array.forEach(function(node) {
            dict[node.id] = node; //key => node.id; value => node
        });
        return dict;
    }

    graph.links.forEach(function(link) { //for each links in links
        var s = nodes[link.source],
            t = nodes[link.target];
        var i = {}; // intermediate node
        // document.write("Source index: " + s);
        nodes.push(i); //push a placeholder? to the end
        links.push({
            source: s,
            target: i
        }, {
            source: i,
            target: t
        });
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
        // .style("fill", "green")
        .style("fill", function(d) {
            return color(d.color);
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
