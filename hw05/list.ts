class List<T extends { toString(): string }> {
    listSize: number = 0;
    dataStore: T[] = [];
    constructor() {
        this.listSize = 0;
        this.dataStore = [];
    }
    append(element: T): void {
        this.dataStore[this.listSize++] = element;
    }
    find(element: T): number {
        for (let i = 0; i < this.dataStore.length; ++i) {
            if (this.dataStore[i] === element) {
                return i;
            }
        }
        return -1;
    }
    remove(element: T): boolean {
        let foundAt = this.find(element);
        if (foundAt > -1) {
            this.dataStore.splice(foundAt,1);
            --this.listSize;
            return true;
        }
        return false;
    }
    length(): number {
        return this.listSize;
    }
    toString(): string {
        return this.dataStore.toString();
    }
    insert(element: T, after: T): boolean {
        let insertPos = this.find(after);
        if (insertPos > -1) {
            this.dataStore.splice(insertPos+1, 0, element);
            ++this.listSize;
            return true;
        }
        return false;
    }
    clear(): void {
        this.dataStore = [];
        this.listSize = 0;
    }
    contains(element: T): boolean {
        for (let i = 0; i < this.dataStore.length; ++i) {
            if (this.dataStore[i] == element) {
                return true;
            }
        }
        return false;
    }
}

// Tests for the List class
let names = new List();
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
