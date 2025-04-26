export class ParentChild {
  private group: string;
  private order: number;

  constructor(group: string, order: number) {
    if (order < 0) {
      throw new Error("Order must be a non-negative integer.");
    }
    this.group = group;
    this.order = order;
  }
}
