const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		if( arguments.length>0){
		this.maxSize = maxSize;
		} else {
			this.maxSize = 30;
		}
		return this;
	}

	push(data, priority) {

	}

	shift() {

	}

	size() {

	}

	isEmpty() {
		
	}
}

module.exports = PriorityQueue;
