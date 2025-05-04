import { Group } from "./Group";
import { Order } from "./Order";

export class ParentChild {
  private group: Group;
  private order: Order;

  constructor(group: Group, order: Order) {
    this.group = group;
    this.order = order;
  }

  /**
   * ドラッグされた要素がグループの親か判定
   * @param {string} draggable
   * @returns boolean
   */
  isParent = () => {
    return this.order.isParent();
  }

  /**
   * ドラッグされた要素のブロックを判定
   * paewnrはドロップの時に座標を更新するため弾く
   * @param {string} draggable
   * @returns boolean
   */
  isDragGroup = (group : string) => {
    // ドラッグされているグループを判定
    if(!this.group.isDragGroup(group)) {
      return false;
    }
    // 親か判定
    if(this.isParent()) {
      return false;
    }

    return true
  }
}
