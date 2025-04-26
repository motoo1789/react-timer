import { Position } from "./position/Position";
import { ParentChild } from "./parent_child/ParentChild";
import { Top } from "./position/Top";
import { Left } from "./position/Left";

export class Block {
  private id: string;
  position: Position;
  parentChild: ParentChild;
  constructor(
    id: string,
    top: number,
    left: number,
    group: string,
    order: number
  ) {
    this.id = id;
    this.position = new Position(new Top(top), new Left(left));
    this.parentChild = new ParentChild(group, order);
  }

  // タイマーの位置を更新するメソッド
  updatePosition(newPosition: { top: number; left: number }) {
    this.position = new Position(
      new Top(newPosition.top),
      new Left(newPosition.left)
    );
  }

  // タイマーの親子関係を更新するメソッド
  updateParentChild(newParentChild: { id: string; order: number }) {
    this.parentChild = new ParentChild(newParentChild.id, newParentChild.order);
  }
}
