class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left && this.right) {
			return;
		} else if (this.left === null) {
			this.left = node;
			node.parent = this;
		} else if (this.right === null) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (this.left === node) {
			this.left.parent = null;
			this.left = null;
		} else if (this.right === node) {
			this.right.parent = null;
			this.right = null;
		}  else { 
			throw new Error('error');
		}
		return this;
	}

	remove() {
		if (this.parent) {
		  this.parent.removeChild(this);
		}
		return this;
	}

	swapWithParent() {
		if (!this.parent) {
			return;
		} else {
			const right = this.right;
			const left = this.left;
			const parent = this.parent;
			const parentLeft = this.parent.left;
			const parentRight = this.parent.right;
			const grandParent = this.parent.parent;

			this.parent = grandParent;
			parent.parent = this;
			if (parent.left === this) {
				this.left = parent;
				this.right = parent.right;
				parent.parent = this;
				parent.left = left;
				parent.right = right;
				if (parentRight) {
					parentRight.parent = this;
				}
				if (grandParent && grandParent.right === parent) {
					grandParent.right = this;
				} else if (grandParent && grandParent.left === parent) {
					grandParent.left = this;
				}
			} else if (parent.right === this) {
				this.right = parent;
				this.left = parent.left;
				parent.parent = this;
				parent.left = left;
				parent.right = right;
				if (parentLeft) {
					parentLeft.parent = this;
				}
				if (grandParent && grandParent.right === parent) {
					grandParent.right = this;
				} else if (grandParent && grandParent.left === parent) {
					grandParent.left = this;
				}
			}
		}
	}
}

module.exports = Node;
