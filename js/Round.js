(function () {
    window.Round = function (bgObj) {
        this.now = -1;
        this.bgObj = bgObj;
        this.players = bgObj.players;
        this.pieceArr = bgObj.piece;
        this.pieceCur = $(".piece-cur");


    }

    Round.prototype.init = function () {
        this.now = 0;
        console.info(this.now);
        this.players[this.now].play();      //第一颗棋子
        console.info(this.players[this.now], this.now);
    }
    Round.prototype.next = function () {
        this.now = this.getNext();
        this.players[this.now].play();
        this.pieceArr[this.now].set(this.pieceCur, 0.5);
        return this.now;
    }

    Round.prototype.getNext = function () {
        return (this.now + 1) % this.pieceArr.length;
    }


})();