const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		const newNode = new Node(data, priority);
		this.insertNode(newNode);
		this.shiftNodeUp(newNode);
		this.heapSize += 1;
	}

	pop() {
		if (!this.heapSize) return;
		this.heapSize -= 1;
		const returnRoot = this.root;
		const detachedRoot = this.detachRoot();
		this.restoreRootFromLastInsertedNode(detachedRoot);
		
		// this.detachRoot();
		if (this.root) {
			this.shiftNodeDown(this.root);
		}
		// this.shiftNodeDown(this.root);
		return detachedRoot.data;


	}

	detachRoot() {
    const index = this.parentNodes.indexOf(this.root);
    if (index >= 0) {
      this.parentNodes.splice(index, 1);
    }
    const detachedRoot = this.root;
    this.root = null;
    return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		this.root = this.parentNodes.pop(); 
		if(detached.left !== this.root) {
			this.root.appendChild(detached.left);
		}
		if(detached.right !== this.root) {
			this.root.appendChild(detached.right);
		}
		if(this.root.right === null) {
			this.parentNodes.unshift(this.root);
		}
		if(this.root.parent != detached) {
			if(this.root.parent.right === this.root) {
			this.parentNodes.unshift(this.root.parent);
			this.root.parent.right = null;
			} else this.root.parent.left = null;
		}
		this.root.parent = null;
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		if (this.heapSize === 0) {
			return true;
		} else {
			return false;
		}
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	insertNode(node) {
		if (!this.root) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if (this.parentNodes[0].right) {
				this.parentNodes.shift();
			}
		}
	}

	shiftNodeUp(node) {
		if (node.parent){
			if (node.parent.priority < node.priority) {
				const nodeIndex = this.parentNodes.indexOf(node);
				const nodeParentIndex = this.parentNodes.indexOf(node.parent);
				if (nodeIndex >= 0) {
				  if (nodeParentIndex >= 0) {
					const tmpNode = this.parentNodes[nodeIndex];
					this.parentNodes[nodeIndex] = this.parentNodes[nodeParentIndex];
					this.parentNodes[nodeParentIndex] = tmpNode;
				  } else {
					this.parentNodes[nodeIndex] = node.parent;
				  }
				}
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		} else {
			this.root = node;
		}
	}

	shiftNodeDown(node) {
		let nodeToSwap;
		if (node.left && node.right && node.left.priority > node.right.priority) {
			nodeToSwap = node.left;
		  } else if (node.left && node.right && node.left.priority <= node.right.priority) {
				nodeToSwap = node.right;
		  } else if (node.left && node.left.priority > node.priority) {
				nodeToSwap = node.left;
		  } else {
				return;
			}
			const nodeIndex = this.parentNodes.indexOf(node);
			const nodeToSwapIndex = this.parentNodes.indexOf(nodeToSwap);
			if (nodeToSwapIndex !== -1) {
				if (nodeIndex !== -1) {
					const tmpNode = this.parentNodes[nodeIndex];
					this.parentNodes[nodeIndex] = this.parentNodes[nodeToSwapIndex];
					this.parentNodes[nodeToSwapIndex] = tmpNode;
				} else {
					this.parentNodes[nodeToSwapIndex] = node;
				}
			}
			if (node === this.root) {
				this.root = nodeToSwap;
			}
			
		nodeToSwap.swapWithParent();
		this.shiftNodeDown(node);
	}
}

module.exports = MaxHeap;
