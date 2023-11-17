import Tree, { prettyPrint } from "./bst.js";

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67]);

console.log(`Is the tree balanced? : ${tree.isBalanced()}`);

console.log(`Level Order : ${tree.levelOrder()}`);
console.log(`Pre Order : ${tree.preOrder()}`);
console.log(`In Order : ${tree.inOrder()}`);
console.log(`Post Order : ${tree.postOrder()}`);

tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);

console.log(`Is the tree balanced? : ${tree.isBalanced()}`);

tree.reBalance();

console.log(`Is the tree balanced? : ${tree.isBalanced()}`);

console.log(`Level Order : ${tree.levelOrder()}`);
console.log(`Pre Order : ${tree.preOrder()}`);
console.log(`In Order : ${tree.inOrder()}`);
console.log(`Post Order : ${tree.postOrder()}`);
