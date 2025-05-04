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
}
