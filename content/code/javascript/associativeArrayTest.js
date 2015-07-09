var graph = {
    "nodes": [{
            "id": "aa",
            "index": 0,
            "name": "Myriel",
            "url": "/category/testone",
            "group": 1
        }, {
            "id": "bb",
            "index": 1,
            "name": "Napoleon",
            "url": "/category/testone",
            "group": 1
        }

    ],
    "links": [{
        "id": "xx",
        "source": 1,
        "sourceId": "aa",
        "target": 0,
        "targetId": "bb",
        "url": "/category/testone",
        "value": 1
    }]
}

graph.nodes.forEach(function(n) {
    console.log(n.id);
});

graph.links.forEach(function(n) {
    console.log(n.id);
});

//1st step: make an associative array of nodes--to refer to node objects by id
var nodesDict = function (nodes) {
    var dict = {};
    nodes.forEach(function(n) {
        dict[n.id] = n; //key => node.id; value => node
    });
    return dict;
};

//2nd step: process each link
function processLinks() {
   graph.links.forEach(function(link) {
        var s = nodesDict[link.sourceId],
            t = nodesDict[link.targetId],
            i = 
}







