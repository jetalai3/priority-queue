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
	let tmpNode;
    if (this.parent) {
      if (this.left) {
        this.left.parent = this.parent;
      }
      if (this.right) {
        this.right.parent = this.parent;
      }
      if (this.parent.left === this) {
        if (this.parent.right) {
          this.parent.right.parent = this;
        }
        tmpNode = this.left;
        this.left = this.parent;
        this.parent.left = tmpNode;
        tmpNode = this.right;
        this.right = this.parent.right;
        this.parent.right = tmpNode;
      } else {
        if (this.parent.left) {
          this.parent.left.parent = this;
        }
        tmpNode = this.left;
        this.left = this.parent.left;
        this.parent.left = tmpNode;
        tmpNode = this.right;
        this.right = this.parent;
        this.parent.right = tmpNode;
      }
      if (this.parent.parent) {
        if (this.parent === this.parent.parent.left) {
          this.parent.parent.left = this;
        } else {
          this.parent.parent.right = this;
        }
      }
      tmpNode = this.parent.parent;
      this.parent.parent = this;
      this.parent = tmpNode;
    }
    return this;
  }
}

module.exports = Node;
