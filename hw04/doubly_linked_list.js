class Node {
    constructor(data, next, prev) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.len = 0;
    }

    pushBack(data) {
        let node = new Node(data, null, null);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.len++;
    }

    getNode(index) {
        if (index < 0 || index >= this.len) {
            throw new Error("Index is out of range: " + index);
        }
        let current;
        if (index < this.len / 2) {
            current = this.head;
            for (let i = 0; i < index; i++) {
                current = current.next;
            }
        } else {
            current = this.tail;
            for (let i = this.len; i > index; i--) {
                current = current.prev;
            }
        }
        return current;
    }

    find(data) {
        let current = this.head;
        while (current != null) {
            if (current.data === data) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    insert(data, index) {
        if (index < 0 || index > this.len) {
            throw new Error("Index is out of range: " + index);
        }
        let node = new Node(data, null, null);
        if (this.len === 0) {
            this.head = node;
            this.tail = node;
        } else if (index === 0) {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        } else if (index === this.len) {
            this.pushBack(data);
        } else {
            let current = this.getNode(index);
            node.prev = current.prev;
            node.next = current;
            current.prev.next = node;
            current.prev = node;
        }
        this.len++;
    }

    set(index, data) {
        if (index < 0 || index >= this.len) {
            throw new Error("Index is out of range: " + index);
        } else {
            this.getNode(index).data = data;
        }
    }

    remove(index) {
        if (index < 0 || index >= this.len) {
            throw new Error("Index is out of range: " + index);
        } else if (index === 0) {
            this.head = this.head.next;
            this.head.prev = null;
        } else if (index === this.len - 1) {
            this.tail = this.tail.prev;
            this.tail.next = null;
        } else {
            let current = this.getNode(index);
            current.prev.next = current.next;
            current.next.prev = current.prev;
        }
        this.len--;
    }

    toString(sep = ', ') {
        let res = "[";
        let current = this.head;
        while (current != null) {
            if (current !== this.tail) {
                res += `${current.data.toString()}${sep}`;
            } else {
                res += `${current.data.toString()}`;
            }
            current = current.next;
        }
        res += "]";
        return res;
    }
}

// Testing
// List of lists
let list = new DoublyLinkedList();
let to_push;
for (let i = 0; i < 5; i++) {
    to_push = new DoublyLinkedList();
    to_push.pushBack(i);
    to_push.pushBack(i + 1);
    list.pushBack(to_push);
}
console.log(list.toString());

// With usual data all the methods
list = new DoublyLinkedList();
for (let i = 0; i < 5; i++) {
    list.pushBack(i);
}

console.log(list.toString());
console.log('Index of node with data = 2:', list.find(2).data);
console.log('list len:', list.len);
list.insert(-1, 0)
list.insert(1.5, 2);
console.log('After 2 inserts:')
console.log('list len:', list.len);

console.log(list.toString());

list.set(2, 1.95);
list.remove(1);
list.remove(3);
console.log('After set, and 2 remove:');
console.log('list len:', list.len);

console.log(list.toString())
