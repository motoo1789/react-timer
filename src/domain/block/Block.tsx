import { Position } from "./position/Position";
import { ParentChild } from "./parent_child/ParentChild";
import { BlockId } from "./BlockId"; // Import BlockId

export class Block {
  readonly id: BlockId;
  position: Position;
  parentChild: ParentChild;
  constructor(
    id: BlockId,
    position: Position,
    ParentChild: ParentChild
  ) {
    this.id = id;
    this.position = position;
    this.parentChild = ParentChild;
  }

  // タイマーの位置を更新するメソッド
  updatePosition(newPosition: Position){
    this.position = newPosition;
  }

  // タイマーの親子関係を更新するメソッド
  updateParentChild(newParentChild: ParentChild){
    this.parentChild = newParentChild;
  }

  getPosition() : {top: number, left: number} {
    return this.position.getPosition();
  } 
}
