export class Order {
    private readonly order: number;

    constructor(order: number) {
        if (order < 0) {
            throw new Error("Order must be a non-negative integer.");
        }
        this.order = order;
    }
  }
  