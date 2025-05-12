export class Order {
  private readonly order: number;

  constructor(order: number) {
    if (order < 0) {
      throw new Error("Order must be a non-negative integer.");
    }
    this.order = order;
  }

  /**
   * ドラッグされた要素がグループの親か判定
   * @param {string} draggable
   * @returns boolean
   */
  isParent = () => {
    return this.order === 0 || false;
  };

  /**
   * 削除退場のブロックよりオーダーが大きいか判定
   * @param {number} draggableOrder
   * @returns number
   */
  isOverOder = (draggableOrder : Order) => {
    // draggableOrder.orderはエラーになるかも
    return draggableOrder.order < this.order || false;
  }

  getOrder(): Order {
    return this;
  }

  /**
   * 新しいOrderを生成する(穴埋め、)
   * @param {number} order
   * @returns Order
   */
  update(order : number) : Order {
    return new Order(this.order + order);
  }

  /**
   * 新しいOrderを生成する(穴埋め)
   * @returns Order
   */
  fillBlock() : Order {
    return new Order(this.order - 1);
  }

  /**
   * remove時の座標を取得する
   * @returns {number}
   */
  getOrderValue() : number {
    return this.order;
  }

  /**
   * グループが他のグループにドロップした時に子ブロックのorderも変える
   * @param {Order} maxOrder
   * @returns boolean | string
   */
  groupingSortOrder(maxOrder: Order) : Order {
    console.log("groupingSortOrder");
    console.log(maxOrder.getOrderValue());
    //if(maxOrder.getOrderValue() === 0) {
    return new Order(this.order + maxOrder.getOrderValue() + 1);
  }

  /**
   * グループが他のグループにドロップした時に子ブロックのorderも変える
   * @param {Order} maxOrder
   * @returns boolean | string
   */
  grouping(maxOrder: Order) : Order {
    console.log("grouping");
    return new Order(maxOrder.getOrderValue() + 1);
  }
}
