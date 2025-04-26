import { Position } from "./Position";
import { ParentChild } from "./ParentChild";

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
        this.position = new Position(top, left);
        this.parentChild = new ParentChild(group, order);
    }
    
    // タイマーの位置を更新するメソッド
    updatePosition(newPosition: { top: number; left: number }) {
        this.position = new Position(newPosition.top, newPosition.left);
    }
    
    // タイマーの親子関係を更新するメソッド
    updateParentChild(newParentChild: { id: string; order: number }) {
        this.parentChild = new ParentChild(newParentChild.id, newParentChild.order);
    }
}