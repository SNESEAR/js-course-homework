"use strict";
var ListNode = /** @class */ (function () {
    function ListNode(data, next, prev) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
    return ListNode;
}());
var DoublyLinkedList = /** @class */ (function () {
    function DoublyLinkedList() {
        this.len = 0;
        this.head = null;
        this.tail = null;
        this.len = 0;
    }
    DoublyLinkedList.prototype.pushBack = function (data) {
        var node = new ListNode(data, null, null);
        if (this.head === null || this.tail === null) {
            this.head = node;
            this.tail = node;
        }
        else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.len++;
    };
    DoublyLinkedList.prototype.getNode = function (index) {
        if (index < 0 || index >= this.len) {
            throw new Error("Index is out of range: " + index);
        }
        var current;
        if (index < this.len / 2) {
            current = this.head;
            for (var i = 0; i < index; i++) {
                current = current.next;
            }
        }
        else {
            current = this.tail;
            for (var i = this.len; i > index; i--) {
                current = current.prev;
            }
        }
        return current;
    };
    DoublyLinkedList.prototype.find = function (data) {
        var current = this.head;
        while (current != null) {
            if (current.data === data) {
                return current;
            }
            current = current.next;
        }
        return null;
    };
    DoublyLinkedList.prototype.insert = function (data, index) {
        if (index < 0 || index > this.len) {
            throw new Error("Index is out of range: " + index);
        }
        var node = new ListNode(data, null, null);
        if (this.len === 0) {
            this.head = node;
            this.tail = node;
        }
        else if (index === 0) {
            if (this.head) {
                this.head.prev = node;
                node.next = this.head;
                this.head = node;
            }
        }
        else if (index === this.len) {
            this.pushBack(data);
        }
        else {
            var current = this.getNode(index);
            node.prev = current.prev;
            node.next = current;
            if (current.prev) {
                current.prev.next = node;
            }
            current.prev = node;
        }
        this.len++;
    };
    DoublyLinkedList.prototype.set = function (index, data) {
        if (index < 0 || index >= this.len) {
            throw new Error("Index is out of range: " + index);
        }
        else {
            this.getNode(index).data = data;
        }
    };
    DoublyLinkedList.prototype.remove = function (index) {
        if (index < 0 || index >= this.len) {
            throw new Error("Index is out of range: " + index);
        }
        else if (index === 0) {
            if (this.head) {
                this.head = this.head.next;
                if (this.head) {
                    this.head.prev = null;
                }
            }
        }
        else if (index === this.len - 1) {
            if (this.tail) {
                this.tail = this.tail.prev;
                if (this.tail) {
                    this.tail.next = null;
                }
            }
        }
        else {
            var current = this.getNode(index);
            if (current.prev && current.next) {
                current.prev.next = current.next;
                current.next.prev = current.prev;
            }
        }
        this.len--;
    };
    DoublyLinkedList.prototype.toString = function (sep) {
        if (sep === void 0) { sep = ', '; }
        var res = "[";
        var current = this.head;
        while (current != null) {
            res += current.data.toString();
            res += current !== this.tail ? sep : "";
            current = current.next;
        }
        res += "]";
        return res;
    };
    return DoublyLinkedList;
}());
// Testing
// List of lists
var list = new DoublyLinkedList();
var to_push;
for (var i = 0; i < 5; i++) {
    to_push = new DoublyLinkedList();
    to_push.pushBack(i);
    to_push.pushBack(i + 1);
    list.pushBack(to_push);
}
console.log(list.toString());
// With usual data all the methods
list = new DoublyLinkedList();
for (var i = 0; i < 5; i++) {
    list.pushBack(i);
}
console.log(list.toString());
var found = list.find(2);
if (found) {
    console.log('Index of node with data = 2:', found.data);
}
console.log('list len:', list.len);
list.insert(-1, 0);
list.insert(1.5, 2);
console.log('After 2 inserts:');
console.log('list len:', list.len);
console.log(list.toString());
list.set(2, 1.95);
list.remove(1);
list.remove(3);
console.log('After set, and 2 remove:');
console.log('list len:', list.len);
console.log(list.toString());
