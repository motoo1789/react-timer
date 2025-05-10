import { Top } from "./Top";
import { Left } from "./Left";
import { PositionUI } from "../../../type";

export class Position {
  private top: Top;
  private left: Left;

  constructor(top: Top, left: Left) {
    this.top = top;
    this.left = left;
  }

  getPosition() : Position {
    return this;
  }

  update(deltaTop: number, deltaLeft: number) : Position{
    return new Position(this.top.update(deltaTop), this.left.update(deltaLeft));
  }
  /**
   * ドラッグ時の子ブロックの座標を更新
   * @param {number} dragTop
   * @param {number} dragLeft
   */
  drag(dragTop: number, dragLeft: number) : void {
    this.top = this.top.drag(dragTop);
    this.left = this.left.drag(dragLeft);
  }

  getUIUseJson(): PositionUI {
    return {
      top: this.top.getValue(),
      left: this.left.getValue(),
    };
  }

  getLeftValue(): number {
    return this.left.getValue();
  }

  getTopValue(): number {
    return this.top.getValue();
  }
}
