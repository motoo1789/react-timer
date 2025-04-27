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
  }
  