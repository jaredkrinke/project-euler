// Priority queue using an array-backed binary heap
export interface PrioritizedItem {
    readonly priority: number;
}

export class PriorityQueue<TItem extends PrioritizedItem> {
    private tree: TItem[] = [];

    private updateParents(index: number): void {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.tree[parentIndex];
            const child = this.tree[index];
            if (child.priority <= parent.priority) {
                // Invariant is satisfied
                return;
            }

            // Invariant is not satisfied; swap child and parent and then check the updated parent
            // TODO: Consolidate swap code
            this.tree[parentIndex] = child;
            this.tree[index] = parent;
            index = parentIndex;
        }
    }

    private updateChildren(index: number): void {
        while (index < this.tree.length) {
            let replacementIndex = index;

            const childLeftIndex = (index + 1) * 2 - 1;
            if (childLeftIndex < this.tree.length && this.tree[replacementIndex].priority < this.tree[childLeftIndex].priority) {
                replacementIndex = childLeftIndex;
            }

            const childRightIndex = childLeftIndex + 1;
            if (childRightIndex < this.tree.length && this.tree[replacementIndex].priority < this.tree[childRightIndex].priority) {
                replacementIndex = childRightIndex;
            }

            if (replacementIndex !== index) {
                // Invariant is not satisfied; swap
                const parent = this.tree[index];
                this.tree[index] = this.tree[replacementIndex]
                this.tree[replacementIndex] = parent;
                index = replacementIndex;
            } else {
                // Invariant is satisfied
                return;
            }
        }
    }

    enqueue(item: TItem): void {
        this.tree.push(item);
        this.updateParents(this.tree.length - 1);
    }

    dequeue(): TItem {
        if (this.tree.length <= 0) {
            throw "Priority queue is empty";
        }

        const item = this.tree[0];
        const lastItem = this.tree.pop() as TItem;
        if (this.tree.length > 0) {
            this.tree[0] = lastItem;
            this.updateChildren(0);
        }
        return item;
    }

    size(): number {
        return this.tree.length;
    }
}

// Arbitrary size decimal numbers
// A bit overkill... also BigInt
const base = 10;
export class NaiveDecimal {
    constructor(public digits: number[]) {
    }

    static add(...list: NaiveDecimal[]): NaiveDecimal {
        switch (list.length) {
            case 0: return new NaiveDecimal([]);
            case 1: return list[0];
        }

        const a = list[0];
        const b = list[1];
        const sum = new NaiveDecimal([]);
        const maxLength = Math.max(a.digits.length, b.digits.length);
        let remainder = 0;
        for (let i = 0; i < maxLength; i++) {
            const digitSum = remainder + (a.digits[i] ?? 0) + (b.digits[i] ?? 0);
            sum.digits.push(digitSum % base);
            remainder = Math.floor(digitSum / base);
        }
        if (remainder > 0) {
            sum.digits.push(remainder);
        }

        return NaiveDecimal.add(sum, ...list.slice(2));
    }

    static multiply(...list: NaiveDecimal[]): NaiveDecimal {
        switch (list.length) {
            case 0: return new NaiveDecimal([]);
            case 1: return list[0];
        }

        const a = list[0];
        const b = list[1];
        const digitProducts: NaiveDecimal[] = [];
        for (let i = 0; i < a.digits.length; i++) {
            const row = new NaiveDecimal([]);
            digitProducts[i] = row;
            let remainder = 0;
            for (let j = 0; j < b.digits.length; j++) {
                const product = remainder + (a.digits[i] * b.digits[j]);
                row.digits.push(product % base);
                remainder = Math.floor(product / base);
            }
            if (remainder > 0) {
                row.digits.push(remainder);
            }
            for (let k = 0; k < i; k++) {
                row.digits.unshift(0);
            }
        }

        const sum = NaiveDecimal.add(...digitProducts);
        return NaiveDecimal.multiply(sum, ...list.slice(2));
    }

    static fromString(str: string): NaiveDecimal {
        return new NaiveDecimal(str.split("").reverse().map(s => parseInt(s)));
    }

    static fromNumber(n: number): NaiveDecimal {
        return NaiveDecimal.fromString(n.toString(base));
    }

    sumDigits(): number {
        return this.digits.reduce((sum, x) => sum + x, 0);
    }

    toString(): string {
        return this.digits.length > 0 ? this.digits.slice().reverse().join("") : "0";
    }
}
