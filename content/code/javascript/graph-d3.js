(function() {    //Closure; For multiple graph defs; see: http://davidwalsh.name/javascript-closures

    var CIRCLE_RAD = 28;
    var CIRCLE_RAD_Q = CIRCLE_RAD;
    var CIRCLE_RAD_NONQ = CIRCLE_RAD_Q * 0.75;
    var CIRCLE_RAD_LARGE = CIRCLE_RAD * 1.35;
    var LINK_DISTANCE = 110;
    var LINK_STRENGTH = 1.5;
    var REPULSION = -600;
    var color = d3.scale.category20();
    var SCREEN_WIDTH = window.innerWidth;
    var SCREEN_HEIGHT = 300;
    var NODE_OPACITY = 1;
    var NODE_STROKE = "orange"; //"orange"
    var NODE_STROKE_WIDTH = 4;
    // var NODE_STROKE = "#666";

    //marker ends
    var REFX = CIRCLE_RAD_LARGE; //25
    var REFY = 0; //0
    var MARKER_WIDTH = CIRCLE_RAD / 4; //6
    var MARKER_HEIGHT = CIRCLE_RAD / 4; //6

    // get the params for this web page
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

    // var graph = params['graph'];
    // alert('graph: ' + graphA);


    //for combining json files
    //http://stackoverflow.com/questions/21450060/how-to-join-two-json-object-in-javascript-without-using-jquery
    var _mergeRecursive = function(obj1, obj2) {
        //iterate over all the properties in the object which is being consumed
        for (var p in obj2) {
            // Property in destination object set; update its value.
            if (obj2.hasOwnProperty(p) && typeof obj1[p] !== "undefined") {
                _mergeRecursive(obj1[p], obj2[p]);

            } else {
                //We don't have that level in the heirarchy so add it
                obj1[p] = obj2[p];

            }
        }
    }


    //Set up the force layout
    var force = d3.layout.force()

    .linkDistance(LINK_DISTANCE) //distance we desire between connected nodes; greater the number, nodes farther apart
        // link distance is the expected distance between nodes => http://stackoverflow.com/questions/17355128/relation-between-linkdistance-and-linkstrength-in-d3-js-force-layout
        .linkStrength(LINK_STRENGTH) //link strength as the speed at which you want to reach target distance on each iteration.
        .charge(REPULSION) //lower the number, nodes farther apart; 
        //negative charge values indicate repulsion, which is generally desirable for force-directed graphs
        .size([SCREEN_WIDTH, SCREEN_HEIGHT]);

    //Append a SVG to the body of the html page. Assign this SVG as an object to var svg
    // var svg = d3.select("body").append("svg")
    // d3.select("body").append("#graph").text("Graph A");

    //find the id of the specified graph
    var id = params['name']; //:name: in rst / 'id' in CSS

    //start at body and work down level-by-level (see DOM info in browser)
    var selectString = ".container .row .col-lg-12 #content article .entry-content #" + id + ".container";

    var svg = d3.select(selectString).append("svg")
        .attr("width", SCREEN_WIDTH)
        .attr("height", SCREEN_HEIGHT);

     // testers for js console:
     // var cons = d3.select(".container .row .col-lg-12 #content article .entry-content #g1.container");

    // var svg = d3.selectAll(".container .row .col-lg-12 #content article").select(".entry-content:nth-child(7)").append("svg")
    //     .attr("width", SCREEN_WIDTH)
    //     .attr("height", SCREEN_HEIGHT);

    var graphPath = "/article-graphs/" + params['graph'];
    // alert("graphPath: " + graphPath); //works
    // alert("thisNode: " + params['thisNode']); //works

    //Read the data from the json data file
    d3.json(graphPath, function(error, graph) {
        // d3.json("/article-graphs/graph-mis-1.json", function(error, graph) {
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

        // var thisNode = nodesDict[params['thisNode']];
        // thisNode.fixed = true;
        // thisNode.x = SCREEN_WIDTH/4;
        // thisNode.y = SCREEN_HEIGHT/4;
        // alert('thisNode: ' + thisNode);

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
            .attr("refX", REFX) //25
            .attr("refY", REFY) //0
            .attr("markerWidth", MARKER_WIDTH) //6
            .attr("markerHeight", MARKER_HEIGHT) //6
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
                if (d.hasArticle == "true")
                    return "/articles/" + d.category.toLowerCase() + "/" + d.slug + "/";
                else
                    return null;
            })
            .call(force.drag);

        // var curr = params['thisNode'];
        // alert("Curr: " + curr);

        node.append("circle")
            .attr("r", function(d) {
                if (d.category === 'Question')
                    return CIRCLE_RAD_Q;
                else
                    return CIRCLE_RAD_NONQ;
            })
            .style("opacity", NODE_OPACITY)
            .style("stroke", NODE_STROKE)
            .style("stroke-width", function(d) {
                if (d.slug === params['thisNode'])
                    return NODE_STROKE_WIDTH;
                else
                    return 0;
            })
            .style("fill", function(d) {
                return color(d.category)
            });

        // stroke:pink;stroke-width:5

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
})();


