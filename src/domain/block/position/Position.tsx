import { Top } from "./Top";
import { Left } from "./Left";

export class Position {
  private top: Top;
  private left: Left;

  constructor(top: Top, left: Left) {
    this.top = top;
    this.left = left;
  }

  getPosition() : {top: number, left: number} {
    return { top: this.top.getTop(), left: this.left.getLeft() };
  }


  update(deltaTop: number, deltaLeft: number) : Position{
    return new Position(this.top.update(deltaTop), this.left.update(deltaLeft));
  }

  // updateTop(delta: number) {
  //   this.top = this.top.update(delta);
  // }

  // updateLeft(delta: number) {
  //   this.left = this.left.update(delta);
  // }
}
