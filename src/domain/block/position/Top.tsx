export class Top {
    private readonly top: number;
    private readonly MIN : number = -99999; // configで変えられるようにする
    private readonly MAX : number = 99999; // configで変えられるようにする

    constructor(top: number) {
        if(top < this.MIN) {
            throw new Error("Top must be a non-negative integer.");
        }
        if(top > this.MAX) {
            throw new Error("Top must be less than or equala to 100.");
        }
        this.top = top;
    }

    getTop() {
        return this.top;
    }

    /**
     * 値を更新する(dragなどの変化量を用いて) drop
     * @param {number} left
     * @returns {Left}
     */
    update = (toptPosition: number) => {
        console.log("Top > update > ",toptPosition)
        return new Top(this.top + toptPosition);
    }

    /**
     * 値を更新する drag
     * @param {number} dragPosition
     * @returns {Left}
     */
    drag = (dragPosition: number) => {
        console.log("Top > update > ", dragPosition)
        return new Top(dragPosition);
    }

    /**
     * 値を取得する
     * @returns {number}
     */
    getValue() {
        return this.top;
    }
  }
  