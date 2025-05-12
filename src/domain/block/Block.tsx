import { Position } from "./position/Position";
import { ParentChild } from "./parent_child/ParentChild";
import { BlockId } from "./BlockId"; // Import BlockId
import { Order } from "./parent_child/Order";
import { Group } from "./parent_child/Group";

export class Block {
  private readonly id: BlockId;
  private position: Position;
  private parentChild: ParentChild;
  constructor(id: BlockId, position: Position, ParentChild: ParentChild) {
    this.id = id;
    this.position = position;
    this.parentChild = ParentChild;
  }

  /**
   * getter
   */
  getBlockId(): BlockId {
    return this.id;
  }

  getPosition(): Position {
    return this.position.getPosition();
  }

  getParentChild(): ParentChild {
    return this.parentChild;
  }

  getOrder(): Order {
    return this.parentChild.getOrder();
  }

  getGroup(): Group {
    return this.parentChild.getGroup();
  }

  getLeftValue(): number {
    return this.position.getLeftValue();
  }

  getTopValue(): number {
    return this.position.getTopValue();
  }
  // getGroupValue(): Group {
  //   return this.parentChild.getGroupValue();
  // }

  // タイマーの親子関係を更新するメソッド
  updateParentChild(newParentChild: ParentChild) {
    this.parentChild = newParentChild;
  }

  /**
   * 新しいOrderを生成する(穴埋め)
   */
  updateFillBlock() {
    this.parentChild.updateFillBlockId();
  }

  /**
   * 変化量でPositionを更新する
   * @param {number} deltaTop
   * @param {number} deltaLeft
   * @returns number
   */
  updatePosition(deltaTop: number, deltaLeft: number) {
    this.position = this.position.update(deltaTop, deltaLeft);
  }

  /**
   * 絶対値でPositionを更新する
   * @param {number} deltaTop
   * @param {number} deltaLeft
   * @returns number
   */
  setPosition(newPosition: Position): void {
    this.position = newPosition;
  }

  /**
   * ドラッグされた要素がグループの親か判定
   * @param {string} draggable
   * @returns boolean
   */
  isParent(): boolean {
    return this.parentChild.isParent();
  }

  /**
   * ドラッグされた要素のブロックを判定
   * paewnrはドロップの時に座標を更新するため弾く
   * @param {string} draggable
   * @returns boolean
   */
  isDragGroup(group: string): boolean {
    return this.parentChild.isDragGroup(group);
  }

  /**
   * Orderオブジェクトを使ってgroupの判定を行う
   * @param {Order} droppableOrder
   * @returns boolean
   */
  isSameGroupUseGroup(droppableOrder: Group): boolean {
    return this.parentChild.isSameGroupUseOrder(droppableOrder);
  }

  /**
   * 削除退場のブロックよりオーダーが大きいか判定
   * @param {number} draggableOrder
   * @returns number
   */
  isOverOrder = (draggableOrder: Order) => {
    return this.parentChild.isOverOrder(draggableOrder);
  };

  /**
   * ドラッグされた要素がグループにあるか判定
   * @param {string} draggable
   * @returns boolean | string
   */
  public canRemoveTimerBlock = (draggable: string) => {
    console.log("canRemoveTimerBlock", draggable);
    return this.parentChild.canRemoveTimerBlock(draggable);
  };

  /**
   * グループが他のグループにドロップした時に子ブロックのorderも変える
   * @param {Order} maxOrder
   * @returns boolean | string
   */
  groupingSortOrder(maxOrder: Order, parent: Group): void {
    this.parentChild.groupingSortOrder(maxOrder, parent);
  }

  /**
   * グループが他のグループにドロップした時に子ブロックのorderも変える
   * @param {Order} maxOrder
   * @returns boolean | string
   */
  grouping(maxOrder: Order, parent: Group): void {
    this.parentChild.grouping(maxOrder, parent);
  }


  /**
   * ドラッグ時の子ブロックの座標を更新
   * @param {number} deltaTop
   * @param {number} deltaLeft
   */
  drag(deltaTop: number, deltaLeft: number): void {
    this.position.drag(deltaTop, deltaLeft);
  }
}
