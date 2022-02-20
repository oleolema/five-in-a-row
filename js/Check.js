(function () {
    window.Check = function (bgObj) {
        this.bgObj = bgObj;
        this.check = bgObj.map;
        this.p = [
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1],
            [-1, -1],
            [-1, 0],
            [-1, 1]
        ];
        this.w = this.bgObj.w;
        this.h = this.bgObj.h;
    }

    Check.prototype.setCheck = function (x, y, n) {
        this.check[y][x] = n;
        console.info(y, x, this.check[y][x]);
        console.info(this.check);
    }

    Check.prototype.checked = function () {
        for (var i = 0; i < this.h; i++) {
            for (var j = 0; j < this.w; j++) {
                if (this.checkCount(i, j, 5)) {
                    this.win();
                    console.info("1");
                    return true;
                }
            }
        }
        return false;
    }

    Check.prototype.win = function () {
        this.bgObj.gameOver = true;
        new Toast(`${roundObj.players[roundObj.now].piece.color} won!!! <a href="javascript:void(0);" onclick="location.reload()">重新开始</a>`, 0x7fffffff, false);
    }


    //i:y,j:x
    Check.prototype.checkCount = function (i, j, m) {
        for (var k = 0; k < 8; k++) {
            var x = this.p[k][0] + j;
            var y = this.p[k][1] + i;
            if (this.check[i][j] != -1 && x >= 0 && x < this.w && y >= 0 && y < this.h && this.check[i][j] == this.check[y][x]) {
                if (this.checkp(y, x, k, m - 2) == 0) {
                    return true;
                }
            }
        }
        return false;
    }

    Check.prototype.checkp = function (i, j, k, m) {
        if (m == 0) {
            return m;
        }
        var x = this.p[k][0] + j;
        var y = this.p[k][1] + i;
        if (this.check[i][j] != -1 && x >= 0 && x < this.w && y >= 0 && y < this.h && this.check[i][j] == this.check[y][x]) {
            return this.checkp(y, x, k, m - 1);
        }
        return m;
    }



})();