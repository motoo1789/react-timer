import { Group } from "./Group";
import { Order } from "./Order";

export class ParentChild {
  private group: Group;
  private order: Order;

  constructor(group: Group, order: Order) {
    this.group = group;
    this.order = order;
  }
}
