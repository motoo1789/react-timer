import { Group } from "./Group";
import { Order } from "./Order";
import { ParentChildUI } from "../../../type";

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
  };

  /**
   * ドラッグされた要素のブロックを判定
   * paewnrはドロップの時に座標を更新するため弾く
   * @param {string} draggable
   * @returns boolean
   */
  isDragGroup = (group: string) => {
    // ドラッグされているグループを判定
    return this.group.isDragGroup(group);
  };

  /**
   * ドラッグされた要素のブロックを判定
   * paewnrはドロップの時に座標を更新するため弾く
   * @param {string} draggable
   * @returns boolean
   */
  isSameGroupUseOrder = (draggableOrder: Group) => {
    // ドラッグされているグループを判定
    return this.group.isDragGroup(draggableOrder.getGroupValue());
  };

  /**
   * 削除退場のブロックよりオーダーが大きいか判定
   * @param {number} draggableOrder
   * @returns number
   */
  isOverOrder = (draggableOrder: Order) => {
    return this.order.isOverOder(draggableOrder);
  };

  /**
   * 他ブロックのorderを比較するために取得
   * @returns number
   */
  getOrder(): Order {
    return this.order.getOrder();
  }

  /**
   * 他ブロックのorderを比較するために取得
   * @returns number
   */
  getGroup(): Group {
    return this.group.getGroup();
  }

  /**
   * ドラッグされた要素がグループにあるか判定
   * @param {string} draggable
   * @returns boolean | string
   */
  public canRemoveTimerBlock = (draggable: string) => {
    return this.group.canRemoveTimerBlock(draggable);
  };

  /**
   * 新しいOrderを生成する(穴埋め)
   * @returns Order
   */
  updateFillBlockId() {
    this.order = this.order.fillBlock();
  }

  /**
   * グループが他のグループにドロップした時に子ブロックのorderも変える
   * @param {Order} maxOrder
   * @returns boolean | string
   */
  groupingSortOrder(maxOrder: Order): void {
    this.order = this.order.groupingSortOrder(maxOrder);
  }

  /**
   * グループが他のグループにドロップした時に子ブロックのorderも変える
   * @param {Order} maxOrder
   * @returns boolean | string
   */
  grouping(maxOrder: Order): void {
    this.order = this.order.grouping(maxOrder);
  }

  getUIUseJson(): ParentChildUI {
    return {
      id: this.group.getGroupValue(),
      order: this.order.getOrderValue(),
    };
  }
}
