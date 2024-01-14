// CircularDoublyLinkedList.js
import React, { useState } from 'react';

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

const CircularDoublyLinkedList = () => {
  const [head, setHead] = useState(null);

  const appendNode = (data) => {
    const newNode = new Node(data);

    if (!head) {
      newNode.next = newNode;
      newNode.prev = newNode;
      setHead(newNode);
    } else {
      const tail = head.prev;
      tail.next = newNode;
      newNode.prev = tail;
      newNode.next = head;
      head.prev = newNode;
    }
  };

  const displayList = () => {
    if (!head) {
      console.log('Empty list');
      return;
    }

    let current = head;
    do {
      console.log(current.data);
      current = current.next;
    } while (current !== head);
  };

  return (
    <div>
      <h2>Circular Doubly Linked List</h2>
      <button onClick={() => appendNode(Math.random())}>Append Node</button>
      <button onClick={displayList}>Display List</button>
    </div>
  );
};

export default CircularDoublyLinkedList;
