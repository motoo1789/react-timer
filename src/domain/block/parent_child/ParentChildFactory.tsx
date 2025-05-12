import { Group } from "./Group";
import { Order } from "./Order";
import { ParentChild } from "./ParentChild";

export class ParentChildFactoryFactory {
  static createParentChild(group: string, order: number): ParentChild {
    return new ParentChild(new Group(group), new Order(order));
  }
}
