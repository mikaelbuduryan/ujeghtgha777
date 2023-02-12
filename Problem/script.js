class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
//addfromBegining
//addFrom(data,index)
//removeFromBeging
//removeFrom(index)
//sort(param = ACD)
//search(data)
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addFromEnd(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  removeFromEnd() {
    if (!this.head) {
      return null;
    }

    let current = this.head;
    let newTail = current;
    while (current.next != this.tail) {
      current = current.next;
    }
    current.next = null
    this.tail = current;
  }
  print(){
    console.log(this.head)
  }
}
const linkedList = new LinkedList();
linkedList.add(1);
linkedList.add(2);
linkedList.add(3);
linkedList.remove()
linkedList.print()
// console.log(linkedList.remove());
var x = [1,2,3]
console.log(x)
