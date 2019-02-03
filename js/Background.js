(function () {
    window.Background = function (w, h) {
        this.board = $('.board-table');
        this.pieceCur = $(".piece-cur");
        this.pieceCurBorder = $(".piece-cur-border");
        this.w = w;
        this.h = h;
        this.players = [];           //存储玩家
        this.piece = [];            //存储棋子类型
        this.map = [];              //用于判断胜负的棋盘
        this.clickMap = [];         //用于可以点击的棋盘
        var self = this;
        this.clickPiece = function (td, x, y) {
            console.info(td, x, y);
            if (this.map[y][x] != -1) {
                new Toast("此处已有棋子", 1000);
                return false;
            }
            //now = 1;
            var round = roundObj.now;
            console.info(round);
            this.piece[round].set(td);

            this.map[y][x] = round;
            checkObj.checked();       //检查棋盘
            // if(this.players[round].type == 0){
            var x = parseInt(td[0].attributes[1].value) * 50.5 - 25;
            var y = parseInt(td[0].attributes[2].value) * 50.5 - 25;
            self.pieceCurBorder.eq(0).css("transform", `translate(${x}px, ${y}px) `);
            roundObj.next();        //下一回合
            // }

        }
    }

    Background.prototype.addPlayer = function () {
        for (var i = 0; i < arguments.length; i++) {
            this.players.push(arguments[i]);
            this.piece.push(arguments[i].piece);
        }
    }

    Background.prototype.pclick = function (p, y, x) {
        var self = this;
        p.click(function () {
            self.clickPiece(p, x, y);     //棋子被点击
        });
    }


    Background.prototype.init = function () {
        console.info(this.board);
        var self = this;
        //创建html棋盘
        var ptlStr = '<span class="piece piece-top-left"></span>';
        var ptrStr = '<span class="piece piece-top-right"></span>';
        var pblStr = '<span class="piece piece-bottom-left"></span>';
        var pbrStr = '<span class="piece piece-bottom-right"></span>';
        var trStr = '<tr class="board_tr"></tr>';
        var tdStr = '<td></td>';
        var span = '<span style="position:absolute;"></span>'
        for (let i = 0; i < this.h - 1; i++) {
            var tr = $(trStr);
            for (let j = 0; j < this.w - 1; j++) {
                var td = $(tdStr);
                var p = $(ptlStr);
                this.addP(td, p, i, j);

                if (j == this.w - 2) {
                    var p = $(ptrStr);
                    this.addP(td, p, i, j + 1);
                }
                if (i == this.h - 2) {
                    var p = $(pblStr);
                    this.addP(td, p, i + 1, j);
                    if (j == this.w - 2) {
                        var p = $(pbrStr);
                        this.addP(td, p, i + 1, j + 1);
                    }
                }

                tr.append(td);
            }
            this.board.append(tr);
        }

        //创建二维数组，模拟棋盘
        for (var i = 0; i < this.h; i++) {
            this.map[i] = [];
            for (var j = 0; j < this.w; j++) {
                this.map[i][j] = -1;
            }
        }
        //设置跟随鼠标移动的棋子
        this.setPieceHover();
    }

    Background.prototype.addP = function (td, p, i, j) {
        td.append(p);
        p.attr({
            posx: j,
            posy: i,
            down: 0
        });
        this.pclick(p, i, j);
        if (!this.clickMap[i]) {
            this.clickMap[i] = [];
        }
        this.clickMap[i][j] = function () {
            p.click();
        };
    }

    Background.prototype.setPieceHover = function () {
        var self = this;
        $(".piece").mouseover(function (e) {
            // console.info({ a: this.attributes, e: e });
            // var x = parseInt($(this).attr("posx")) * 50.5 - 25;
            // var y = parseInt($(this).attr("posy")) * 50.5 - 25;

            var x = parseInt(this.attributes[1].value) * 50.5 - 25;
            var y = parseInt(this.attributes[2].value) * 50.5 - 25;
            self.pieceCur.eq(0).css("transform", `translate(${x}px, ${y}px) `);
        });
    }


})();