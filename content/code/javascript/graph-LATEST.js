//first, get the params for this web page
var scripts = document.getElementsByTagName('script');
var myScript = scripts[scripts.length - 1];
var queryString = myScript.src.replace(/^[^\?]+\??/, '');
var params = parseQuery(queryString);

function parseQuery(query) {
    var Params = new Object();
    if (!query) return Params; // return empty object
    var Pairs = query.split(/[;&]/);
    for (var i = 0; i < Pairs.length; i++) {
        var KeyVal = Pairs[i].split('=');
        if (!KeyVal || KeyVal.length != 2) continue;
        var key = unescape(KeyVal[0]);
        var val = unescape(KeyVal[1]);
        val = val.replace(/\+/g, ' ');
        Params[key] = val;
    }
    return Params;
}

var scripts = document.getElementsByTagName('script');
var myScript = scripts[scripts.length - 1];
var queryString = myScript.src.replace(/^[^\?]+\??/, '');
var params = parseQuery(queryString);

// var centerNode = params['centerNode']; //string value
// alert('Center node slug name: ' + centerSlugName);

var width = 500,
    height = 300;

var color = d3.scale.category10();

//Set up the force layout
var force = d3.layout.force()

.linkDistance(50) //distance we desire between connected nodes; greater the number, nodes farther apart
    // link distance is the expected distance between nodes => http://stackoverflow.com/questions/17355128/relation-between-linkdistance-and-linkstrength-in-d3-js-force-layout
    .linkStrength(1.5) //link strength as the speed at which you want to reach target distance on each iteration.
    .charge(-500) //lower the number, nodes farther apart; 
    //negative charge values indicate repulsion, which is generally desirable for force-directed graphs
    .size([width, height]);

//Append a SVG to the body of the html page. Assign this SVG as an object to var svg
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
// .attr({
//     'xmlns': 'http://www.w3.org/2000/svg',
//     'xmlns:xmlns:xlink': 'http://www.w3.org/1999/xlink', // hack: doubling xmlns: so it doesn't disappear once in the DOM
//     version: '1.1'
// });


//Read the data from the json data file
d3.json("/code/json/" + params['fileName'], function(error, graph) {
    // d3.json("/code/json/graph-mis-1.json", function(error, graph) {
    if (error) throw error;

    var nodes = graph.nodes,
        links = [];

    //1st step: make an associative array of nodes--to refer to node objects by id
    var nodesDict = {};
    nodes.forEach(function(n) {
        nodesDict[n.slug] = n; //key => node.slug; value => node
    });


    //2nd step: process each link
    graph.links.forEach(function(link) {
        var s = nodesDict[link.source],
            t = nodesDict[link.target]

        links.push({
            source: s,
            target: t,
            type: link.type
        });
    });

    var c = params['centerNode']
    var center = nodesDict[c];
    center.fixed = true;
    center.x = width / 3;
    center.y = height / 3;

    //Creates the graph data structure out of the json data
    force
        .nodes(nodes)
        .links(links)
        .start();

    //---arrow insert-------
    svg.append("defs").selectAll("marker")
        .data(["normal", "licensing", "resolved"])
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
        .style("stroke", "#666") //halfway between link colors
        .style("opacity", "0.85");
    //---end arrow insert---

    //Create all the line svgs but without locations yet
    var link = svg.selectAll(".link")
        .data(links)
        .enter().append("line")
        .style("marker-end", "url(#normal)") // Modified line 
        .attr("class", function(d) {
            return "link_" + d.type;
        });

    //labels from Bostock example: http://bl.ocks.org/mbostock/950642
    var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .append("svg:a")
        .attr("xlink:href", function(d) {
            if (d.hasArticle)
                return "http://localhost:8000/articles/" + d.category + "/" + d.slug + "/";
            else
                return "http://localhost:8000/";
        })
        .call(force.drag);

    node.append("circle")
        .attr("r", 10)
        .style("fill", function(d) {
            return color(d.category);
        });

    //node label
    node.append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function(d) {
            return d.title;
        });

    //node long text on mouse hover
    node.append("title")
        .text(function(d) {
            return d.summary;
        });

    // node.append("image")
    //     .attr("xlink:href", "https://github.com/favicon.ico")
    //     .attr("x", -8)
    //     .attr("y", -8)
    //     .attr("width", 16)
    //     .attr("height", 16);


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

        //note that both circle and text (node label) must be selected
        d3.selectAll("circle").attr("cx", function(d) {
                return d.x;
            })
            .attr("cy", function(d) {
                return d.y;
            });
        d3.selectAll("text").attr("x", function(d) {
                return d.x;
            })
            .attr("y", function(d) {
                return d.y;
            });
    });

});
