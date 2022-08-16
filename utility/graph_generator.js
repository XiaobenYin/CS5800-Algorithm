const fs = require("fs");
const moment = require("moment");
const MAP_FOLDER = "maps";

/**
 * Generate the Map Randomly
 */
let generate = (num_nodes, density, isLive, isRaw) => {
	let DENSITY = parseFloat(density) / 100;
	console.log(DENSITY);
	let low_bound = num_nodes - 1;
	let high_bound = (num_nodes * (num_nodes - 1)) / 2;
	let num_edges = low_bound + Math.floor(DENSITY * (high_bound - low_bound));

	let nodes = [];
	for (let i = 0; i < num_nodes; i++) {
		nodes.push({ id: i });
	}

	let S = nodes.slice(0);
	let T = [];

	let current = S[Math.floor(Math.random() * S.length)];
	T.push(current);
	S.splice(S.indexOf(current), 1);

	let i = 0;
	let edges = [];
	while (S.length > 0) {
		let neighbor = S[Math.floor(Math.random() * S.length)];
		edges.push({
			source: nodes.indexOf(current),
			target: nodes.indexOf(neighbor),
		});
		S.splice(S.indexOf(neighbor), 1);
		T.push(neighbor);
		current = neighbor;
		i++;
	}

	while (edges.length < num_edges) {
		let node1 = nodes[Math.floor(Math.random() * nodes.length)];
		let node2 = nodes[Math.floor(Math.random() * nodes.length)];

		if (node1 !== node2) {
			edges.push({
				source: nodes.indexOf(node1),
				target: nodes.indexOf(node2),
			});
			i++;
		}
	}

	// Convert the Node / Edges into adjacency list
	let graph = [];
	for (let i = 0; i < nodes.length; i++) {
		let adjacents = [];
		for (let j = 0; j < edges.length; j++) {
			if (edges[j].source == i && adjacents.indexOf(edges[j].target) == -1) {
				adjacents.push(edges[j].target);
			}
			if (edges[j].target == i && adjacents.indexOf(edges[j].source) == -1) {
				adjacents.push(edges[j].source);
			}
		}
		adjacents = adjacents.sort((a, b) => a - b);
		graph.push([[i]].concat(adjacents));
	}

	console.log(`Nodes : ${nodes.length}, Edges : ${edges.length}`);
	console.log(nodes);
	console.log(edges);
	console.log(JSON.stringify(graph));

	// isRaw result or not
	let response = isRaw ? { nodes, links: edges } : JSON.stringify(graph);

	if (isLive) {
		return response;
	}

	let timestamp = moment().format("YYYYMMDD_hhmmss");
	let filename = `${MAP_FOLDER}/${timestamp}_${num_nodes}_${density}_${num_edges}.json`;

	try {
		if (!fs.existsSync(MAP_FOLDER)) {
			fs.mkdirSync(MAP_FOLDER);
		}
	} catch (err) {
		console.error(err);
	}

	fs.writeFileSync(`${filename}`, response);

	return filename;
};

exports.generate = generate;
