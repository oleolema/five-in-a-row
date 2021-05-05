class Computer {
    constructor(piece) {
        this.piece = piece;
        this.id = piece.id;
        this.w = bgObj.w;
        this.h = bgObj.h;
        this.map = bgObj.map;
        this.type = 0;
        this.ai = new Ai(bgObj, this);
        this.isFisrt = true;
    }

    play() {
        if (this.isFisrt) {
            bgObj.clickMap[~~(this.h / 2)][~~(this.w / 2)]();
            this.isFisrt = false;
            return;
        }
        var piece = this.ai.nextPiece();
        let x = piece.x;
        let y = piece.y;
        // let x = this.rand(0, this.w);
        // let y = this.rand(0, this.h);
        // if (this.map[y][x] != -1) {
        //     this.play();
        //     return;
        // }
        //now = 0;
        // roundObj.next();  

        //now = 1;
        bgObj.clickMap[y][x]();
        console.info("ai...........")
    }

    rand(a, b) {
        return parseInt(Math.random() * (b - a) + a);
    }

}