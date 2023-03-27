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
    push_back(data) {
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
            return;
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
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        } else {
            let curr_index = 0;
            let current = this.head;
            while (curr_index !== index) {
                current = current.next;
                curr_index++;
            }
            node.prev = current.prev;
            node.next = current;
            current.prev.next = node;
            current.prev = node;
        }
        this.len++;
    }
    change(index, data) {
        if (index < 0 || index >= this.len) {
            return;
        } else if (index === 0) {
            this.head.data = data;
        } else if (index === this.len - 1) {
            this.tail.data = data;
        } else {
            let curr_index = 0;
            let current = this.head;
            while (curr_index !== index) {
                current = current.next;
                curr_index++;
            }
            current.data = data;
        }
    }
    remove(index) {
        if (index < 0 || index >= this.len) {
            return;
        } else if (index === 0) {
            this.head = this.head.next;
            this.head.prev = null;
        } else if (index === this.len - 1) {
            this.tail = this.tail.prev;
            this.tail.next = null;
        } else {
            let curr_index = 0;
            let current = this.head;
            while (curr_index !== index) {
                current = current.next;
                curr_index++;
            }
            current.prev.next = current.next;
            current.next.prev = current.prev;
        }
        this.len--;
    }
    print(separator) {
        let current = this.head;
        process.stdout.write("[");
        while (current != null) {
            if (current !== this.tail) {
                process.stdout.write(`${current.data}${separator}`);
            } else {
                process.stdout.write(`${current.data}`)
            }
            current = current.next;
        }
        process.stdout.write("]\n");
    }
}

// Testing
let list = new DoublyLinkedList();
list.push_back(0);
list.push_back(1);
list.push_back(2);
list.push_back(3);
list.push_back(4);

list.print(', ');

console.log('Index of node with data = 2:', list.find(2).data);
console.log('list len:', list.len);
list.insert(-1, 0)
list.insert(1.5, 2);
console.log('After 2 inserts:')
console.log('list len:', list.len);
list.print(', ')
list.change(2, 1.95);
list.remove(1);
list.remove(3);
console.log('After change, and 2 remove:');
console.log('list len:', list.len);
list.print(', ')
