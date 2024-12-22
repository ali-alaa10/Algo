// Function to heapify a subtree rooted at index i
function heapify(arr, n, i) {
  let largest = i; // Initialize largest as root
  let left = 2 * i + 1; // Left child
  let right = 2 * i + 2; // Right child

  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap

    // Recursively heapify the affected subtree
    heapify(arr, n, largest);
  }
}

// Heap sort function
function heapSort(arr) {
  let n = arr.length;

  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // One by one extract elements from the heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root to the end
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // Call max heapify on the reduced heap
    heapify(arr, i, 0);
  }

  return arr;
}

// Example usage
const numbers = [4, 10, 3, 5, 1];
console.log("Unsorted array:", numbers);
console.log("Sorted array:", heapSort(numbers));

// ===================

class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = Array(size).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
    }
  }
}

function kruskalMST(edges, numVertices) {
  const mst = [];
  const unionFind = new UnionFind(numVertices);

  // Sort edges by weight
  edges.sort((a, b) => a[2] - b[2]);

  for (const [u, v, weight] of edges) {
    if (unionFind.find(u) !== unionFind.find(v)) {
      mst.push([u, v, weight]);
      unionFind.union(u, v);
    }
  }

  return mst;
}

// Example usage
const edges = [
  [0, 1, 10],
  [0, 2, 6],
  [0, 3, 5],
  [1, 3, 15],
  [2, 3, 4],
];
const numVertices = 4;

console.log("Edges in MST:", kruskalMST(edges, numVertices));
