// Generates a random connected graph by first creating a minimum spanning tree
// and then adding edges until the desired density is reached.
// See http://stackoverflow.com/questions/2041517/random-simple-connected-graph-generation-with-given-sparseness
var fs = require('fs');
var moment = require('moment');
const MAP_FOLDER = "/maps";
const DENSITY = 0.2

let generate = (num_nodes, isLive, isRaw) => {
    var low_bound = num_nodes - 1;
    var high_bound = num_nodes * (num_nodes - 1) / 2;
    var num_edges = low_bound + Math.floor(DENSITY * (high_bound - low_bound));


    var nodes = [];
    for (var i = 0; i < num_nodes; i++) {
        nodes.push({
            name: i,
        	id: i,
        // 	selected: false
        });
        // nodes.push(i);
    }
    var edges = [];

    var S = nodes.slice(0);
    var T = [];

    var current = S[Math.floor(Math.random() * S.length)];
    T.push(current);
    S.splice(S.indexOf(current),1);

    var i = 0;
    while (S.length > 0) {
        var neighbor = S[Math.floor(Math.random() * S.length)];
        edges.push({
            edge_id: i,
            source: nodes.indexOf(current),
            target: nodes.indexOf(neighbor),
            linknum: 1,
            selected: false
        });
        S.splice(S.indexOf(neighbor), 1);
        T.push(neighbor);
        current = neighbor;
        i++;
    }

    while (edges.length < num_edges) {
        var node1 = nodes[Math.floor(Math.random() * nodes.length)];
        var node2 = nodes[Math.floor(Math.random() * nodes.length)];

        if (node1 !== node2) {
            edges.push({
                edge_id: i,
                source: nodes.indexOf(node1),
                target: nodes.indexOf(node2),
                linknum: 1,
                selected: false
            });
            i++;
        }
    }

    // var graph = {
    //     nodes: nodes,
    //     links: edges
    // };

    let graph = [];
    for (let i = 0; i < nodes.length; i++) {
        let adjacents = [];
        // adjacents.push(i+1)
        for (let j = 0; j < edges.length; j++) {
            if (edges[j].source == i && adjacents.indexOf(edges[j].target + 1) == -1) {
                adjacents.push(edges[j].target + 1);
            }
            if (edges[j].target == i && adjacents.indexOf(edges[j].source + 1) == -1) {
                adjacents.push(edges[j].source + 1);
            }
        }
        adjacents = adjacents.sort((a,b) => a-b)
        graph.push([i+1].concat(adjacents));
    }

    console.log(`Nodes : ${nodes.length}, Edges : ${edges.length}`);
    console.log(nodes);
    console.log(edges);
    console.log(JSON.stringify(graph))
    
    // isRaw result or not
    let response = (isRaw) ? {nodes, links : edges} : JSON.stringify(graph);

    if (isLive){
        // return graph;
        return response
    }
 
    let timestamp  = moment().format("YYYYMMDD_hhmmss");
    let filename = `${MAP_FOLDER}/${timestamp}_${num_nodes}_${DENSITY}_${num_edges}.json`;
    fs.writeFileSync(`./${filename}`, response);

    return filename;
}

exports.generate = generate;


