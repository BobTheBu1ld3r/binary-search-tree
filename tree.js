import Node from "Node.js";
export { prettyPrint };

export default class Tree {
  constructor(array) {
    array = array.sort((a, b) => a - b);
    array = array.filter((el, index, arr) => el !== arr[index - 1]);
    this.root = this.buildTree(array);
    this.arrayOfHeights = [];
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const newNode = new Node(array[mid]);
    newNode.left = this.buildTree(array, start, mid - 1);
    newNode.right = this.buildTree(array, mid + 1, end);

    return newNode;
  }

  insert(value, node = this.root) {
    if (this.root === null) this.root = new Node(value);
    if (value === node.data) return null;
    else if (value < node.data) {
      if (!node.left) return (node.left = new Node(value));
      else return this.insert(value, node.left);
    } else {
      if (!node.right) return (node.right = new Node(value));
      else return this.insert(value, node.right);
    }
  }

  remove(value, node = this.root) {
    if (node === null) return;
    else if (node.data === value) {
      this.root = this.deleteNode(this.root);
    } else if (node.left?.data === value) {
      node.left = this.deleteNode(node.left);
    } else if (node.right?.data === value) {
      node.right = this.deleteNode(node.right);
    } else {
      console.log("no match");
      if (value < node.data) {
        this.remove(value, node.left);
      } else {
        this.remove(value, node.right);
      }
    }
  }

  deleteNode(node) {
    // returns the new value of the node
    if (!node.left && !node.right) {
      return null;
    } else if (!(node.left && node.right)) {
      if (node.left) return node.left;
      else return node.right;
    } else {
      const currentValue = node.data;
      const inorderValue = this.findInorder(node.right);
      node.data = inorderValue;
      this.swapInorder(node.right, inorderValue, currentValue);
      this.remove(currentValue, node.right);
      return node;
    }
  }

  findInorder(node) {
    // return inorder value and delete inorder node
    if (node.left) return this.findInorder(node.left);
    else return node.data;
  }

  swapInorder(node, value, replace) {
    if (node.data === value) node.data = replace;
    else this.swapInorder(node.left, value, replace);
  }

  levelOrder(callback, node = this.root) {
    if (node === null) return;
    const queue = [];
    const levelOrderData = [];
    queue.push(node);
    while (queue.length > 0) {
      const current = queue[0];
      levelOrderData.push(current.data);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
      queue.shift();
    }

    if (!callback) return levelOrderData;
    else {
      levelOrderData.forEach(callback);
    }
  }

  preOrder(node = this.root, callback) {
    const arr = [];
    if (node === null) return;
    arr.push(node.data);
    if (node.left) arr.push(...this.preOrder(node.left));
    if (node.right) arr.push(...this.preOrder(node.right));
    if (callback) {
      return arr.forEach(callback);
    } else return arr;
  }

  inOrder(node = this.root, callback) {
    const arr = [];
    if (node === null) return;
    if (node.left) arr.push(...this.inOrder(node.left));
    arr.push(node.data);
    if (node.right) arr.push(...this.inOrder(node.right));
    if (callback) {
      return arr.forEach(callback);
    } else return arr;
  }

  postOrder(node = this.root, callback) {
    const arr = [];
    if (node === null) return;
    if (node.left) arr.push(...this.postOrder(node.left));
    if (node.right) arr.push(...this.postOrder(node.right));
    arr.push(node.data);
    if (callback) {
      return arr.forEach(callback);
    } else return arr;
  }

  find(value, node = this.root) {
    if (this.root === null) return null;
    if (node.data === value) return node;
    else if (value < node.data) return this.find(value, node.left);
    else return this.find(value, node.right);
  }

  height(node = this.root) {
    if (!node) return null;
    this.traverseHeights(node, 0);
    const maxHeight = this.arrayOfHeights.reduce((t, el) => {
      if (el > t) return el;
      else return t;
    });
    this.arrayOfHeights = [];
    return maxHeight;
  }

  traverseHeights(node, height) {
    if (!(node.left || node.right)) {
      this.arrayOfHeights.push(height);
    }
    if (node.right) {
      this.traverseHeights(node.right, height + 1);
    }
    if (node.left) {
      this.traverseHeights(node.left, height + 1);
    }
  }

  depth(targetNode, node = this.root, depth = 0) {
    if (node.data === targetNode.data) {
      if (Object.is(node, targetNode)) return depth;
      else return null;
    } else if (node.left || node.right) {
      if (targetNode.data < node.data) {
        return this.depth(targetNode, node.left, depth + 1);
      } else return this.depth(targetNode, node.right, depth + 1);
    } else {
      return null;
    }
  }

  isBalanced(node = this.root) {
    if (!node) return true;
    if (this.height(node) === 1) return true;
    let heightLeft = 0;
    let heightRight = 0;
    if (node.left) heightLeft = this.height(node.left);
    if (node.right) heightRight = this.height(node.right);
    if (Math.abs(heightLeft - heightRight) > 1) return false;
    else {
      return this.isBalanced(node?.left) && this.isBalanced(node?.right);
    }
  }

  reBalance() {
    const sortedValues = this.inOrder();
    this.root = this.buildTree(sortedValues);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    node;
  }
};
