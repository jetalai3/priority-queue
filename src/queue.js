const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if(this.heap.heapSize >= this.maxSize) { 
			throw ("Error: the queue is full");
		}
		this.heap.push(data, priority);
	}

	shift() {
		if(this.isEmpty()) {
			 throw ("Error: the queue is empty");
		}
		this.heap.pop();
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.heapSize === 0 ? true : false;
	}
}

module.exports = PriorityQueue;
