"use strict";
var List = /** @class */ (function () {
    function List() {
        this.listSize = 0;
        this.dataStore = [];
        this.listSize = 0;
        this.dataStore = [];
    }
    List.prototype.append = function (element) {
        this.dataStore[this.listSize++] = element;
    };
    List.prototype.find = function (element) {
        for (var i = 0; i < this.dataStore.length; ++i) {
            if (this.dataStore[i] === element) {
                return i;
            }
        }
        return -1;
    };
    List.prototype.remove = function (element) {
        var foundAt = this.find(element);
        if (foundAt > -1) {
            this.dataStore.splice(foundAt, 1);
            --this.listSize;
            return true;
        }
        return false;
    };
    List.prototype.length = function () {
        return this.listSize;
    };
    List.prototype.toString = function () {
        return this.dataStore.toString();
    };
    List.prototype.insert = function (element, after) {
        var insertPos = this.find(after);
        if (insertPos > -1) {
            this.dataStore.splice(insertPos + 1, 0, element);
            ++this.listSize;
            return true;
        }
        return false;
    };
    List.prototype.clear = function () {
        this.dataStore = [];
        this.listSize = 0;
    };
    List.prototype.contains = function (element) {
        for (var i = 0; i < this.dataStore.length; ++i) {
            if (this.dataStore[i] == element) {
                return true;
            }
        }
        return false;
    };
    return List;
}());
// Tests for the List class
var names = new List();
names.append("Cynthia");
names.append("Raymond");
names.append("Barbara");
names.append("Jennifer");
names.append("Bryan");
names.append("Danny");
console.log(names.toString());
names.remove("Raymond");
console.log(names.toString());
names.insert("Raymond", "Barbara");
console.log(names.toString());
console.log(names.length());
console.log(names.contains("Raymond"));
console.log(names.contains("Raymond2"));
