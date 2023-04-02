class ListNode<T = unknown> {
    data: T;
    next: ListNode<T> | null;
    prev: ListNode<T> | null;
    constructor(data: T, next: ListNode<T> | null, prev: ListNode<T> | null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}

class DoublyLinkedList<T extends { toString(): string }> {
    head: ListNode<T> | null;
    tail: ListNode<T> | null;
    len: number = 0;

    constructor() {
        this.head = null;
        this.tail = null;
        this.len = 0;
    }

    pushBack(data: T): void {
        let node = new ListNode(data, null, null);
        if (this.head === null || this.tail === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.len++;
    }

    getNode(index: number): ListNode<T> {
        if (index < 0 || index >= this.len) {
            throw new Error("Index is out of range: " + index);
        }
        let current: ListNode<T> | null | undefined;
        if (index < this.len / 2) {
            current = this.head;
            for (let i = 0; i < index; i++) {
                current = current?.next;
            }
        } else {
            current = this.tail;
            for (let i = this.len; i > index; i--) {
                current = current?.prev;
            }
        }
        if (!current) {
            throw new Error("Node is null");
        }
        return current;
    }

    find(data: T): ListNode<T> | null {
        let current = this.head;
        while (current != null) {
            if (current.data === data) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    insert(data: T, index: number): void {
        if (index < 0 || index > this.len) {
            throw new Error("Index is out of range: " + index);
        }
        let node = new ListNode(data, null, null);
        if (this.len === 0) {
            this.head = node;
            this.tail = node;
        } else if (index === 0) {
            if (this.head) {
                this.head.prev = node;
                node.next = this.head;
                this.head = node;
            }
        } else if (index === this.len) {
            this.pushBack(data);
        } else {
            let current = this.getNode(index);
            node.prev = current.prev;
            node.next = current;
            if (current.prev) {
                current.prev.next = node;
            }
            current.prev = node;
        }
        this.len++;
    }

    set(index: number, data: T): void {
        if (index < 0 || index >= this.len) {
            throw new Error("Index is out of range: " + index);
        } else {
            this.getNode(index).data = data;
        }
    }

    remove(index: number): void {
        if (index < 0 || index >= this.len) {
            throw new Error("Index is out of range: " + index);
        } else if (index === 0) {
            if (this.head) {
                this.head = this.head.next;
                if (this.head) {
                    this.head.prev = null;
                }
            }
        } else if (index === this.len - 1) {
            if (this.tail) {
                this.tail = this.tail.prev;
                if (this.tail) {
                    this.tail.next = null;
                }
            }
        } else {
            let current = this.getNode(index);
            if (current.prev && current.next) {
                current.prev.next = current.next;
                current.next.prev = current.prev;
            }
        }
        this.len--;
    }

    toString(sep: string = ', '): string {
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
let found = list.find(2);
if (found) {
    console.log('Index of node with data = 2:', found.data);
}
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
