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

    /**
     * 値を更新する
     * @param {number} leftPosition
     * @returns {Left}
     */
    public update = (leftPosition: number) => {
        return new Left(this.left + leftPosition);
    }

    /**
     * 値を更新する drag
     * @param {number} dragPosition
     * @returns {Left}
     */
    drag = (dragPosition: number) => {
        console.log("left > update > ", dragPosition)
        return new Left(dragPosition);
    }

    /**
     * 値を取得する
     * @returns {number}
     */
    getValue() {
        return this.left;
    }
  }
  