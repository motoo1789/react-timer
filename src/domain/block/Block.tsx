import { Position } from "./position/Position";
import { ParentChild } from "./parent_child/ParentChild";
import { BlockId } from "./BlockId"; // Import BlockId

export class Block {
  private readonly id: BlockId;
  private position: Position;
  private parentChild: ParentChild;
  constructor(id: BlockId, position: Position, ParentChild: ParentChild) {
    this.id = id;
    this.position = position;
    this.parentChild = ParentChild;
  }

  // タイマーの親子関係を更新するメソッド
  updateParentChild(newParentChild: ParentChild) {
    this.parentChild = newParentChild;
  }

  getPosition(): { top: number; left: number } {
    return this.position.getPosition();
  }

  isParent(): boolean {
    return this.parentChild.isParent();
  }

  updatePosition(deltaTop: number, deltaLeft: number) {
    this.position = this.position.update(deltaTop, deltaLeft);
  }

  isDragGroup(group : string) : boolean {
    return this.parentChild.isDragGroup(group);
  }
}
