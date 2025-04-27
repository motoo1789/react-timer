export class Left {
    private readonly left: number;
    private readonly MIN : number = -99999; // configで変えられるようにする
    private readonly MAX : number = 99999; // configで変えられるようにする

    constructor(left: number) {
        if(left < this.MIN) {
            throw new Error("left must be a non-negative integer.");
        }
        if(left > this.MAX) {
            throw new Error("left must be less than or equal to 100.");
        }
        this.left = left;
    }
    
    getLeft() {
        return this.left;
    }
  }
  