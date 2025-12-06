function optimizeRoute(attractions, matrix) {
  const n = attractions.length;
  const visited = Array(n).fill(false);
  let order = [0];  // Start with first attraction
  visited[0] = true;

  for (let i = 0; i < n - 1; i++) {
    let last = order[order.length - 1];
    let next = -1;
    let best = Infinity;

    for (let j = 0; j < n; j++) {
      if (!visited[j] && matrix.durations[last][j] < best) {
        best = matrix.durations[last][j];
        next = j;
      }
    }

    order.push(next);
    visited[next] = true;
  }

  return order;
}

module.exports = { optimizeRoute };
