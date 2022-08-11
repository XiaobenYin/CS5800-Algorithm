/**
 * Contract edge between (object-replacement)
 */
function contractNode(edges, object, replacement) {
  let contractCount = 0;
  for (var i = 0; i < edges.length; i++) {
    if (edges[i].source.index == object.index) {
      edges[i].source = replacement;
      contractCount++
    } else if (edges[i].target.index == object.index) {
      edges[i].target = replacement;
      contractCount++
    }

    if (edges[i].target.index > edges[i].source.index) {
      var temp = edges[i].source;
      edges[i].source = edges[i].target;
      edges[i].target = temp;
      contractCount++
    }
  }
  return contractCount;
}

/**
 * Remove Self Loop Edge 
 */
function removeSelfLoops(edges) {
  let removeCount = 0;
  for (var i = edges.length - 1; i >= 0; i--) {
    if (edges[i].source.index == edges[i].target.index) {
      edges.splice(i, 1);
      removeCount++
    }
  }
  return removeCount;
}
