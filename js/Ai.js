class Ai {
    constructor(bgObj, player) {
        //下      右下    右       左下
        this.p = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
        this.map = bgObj.map;
        this.w = bgObj.w;
        this.h = bgObj.h;
        this.scoreMap = [];     //分值图
        this.enemyScoreMap = [];        //敌人分值图

        this.n = -1; //没有棋子
        this.m = player.id;  //自己棋子
        this.o = this.m == 0 ? 1 : 0;  //别人棋子
        this.setMe(this.m);



        this.init();
    }

    setMe(m) {
        var n = -1;
        var m = this.m = m;
        var o = this.o = this.m == 0 ? 1 : 0;
        //棋谱
        this.template = [
            { name: "连5a", a: [m, m, m, m, m], g: [-1], v: 100000000, ov: 1000000},      //连5

            { name: "活4a", a: [n, m, m, m, m, n], g: [0, 5], v: 100000000, ov: 1000000 },   //活4 -->  连5

            { name: "眠4a", a: [n, m, m, m, m, o], g: [0], v: 110000000, ov: 1000000 },   //眠4  -->  连5
            { name: "眠4b", a: [m, n, m, m, m], g: [1], v: 110000000 ,ov: 1000000},
            { name: "眠4c", a: [m, m, n, m, m], g: [2], v: 110000000 ,ov: 1000000},

            { name: "活3a", a: [o, n, m, m, m, n, n], g: [5], v: 190000, ov: 100000 },      //活3 --> 活4
            { name: "活3b", a: [n, n, m, m, m, n, n], g: [1, 5], v: 190000 , ov: 100000 },
            { name: "活3c", a: [n, m, n, m, m, n], g: [2], v: 190000 , ov: 100000 },

            { name: "眠3a", a: [n, n, m, m, m, o], g: [0, 1], v: 1900, ov: 1000  },         //眠3 --> 眠4
            { name: "眠3b", a: [n, m, n, m, m, o], g: [0, 2], v: 1900, ov: 1000  },
            { name: "眠3c", a: [n, m, m, n, m, o], g: [0, 3], v: 1900, ov: 1000  },
            { name: "眠3d", a: [m, n, n, m, m], g: [1, 2], v: 1900 , ov: 1000 },
            { name: "眠3e", a: [m, n, m, n, m], g: [1, 3], v: 1900 , ov: 1000 },
            { name: "眠3f", a: [o, n, m, m, m, n, o], g: [1, 5], v: 1900, ov: 1000  },

            { name: "活2a", a: [n, n, m, m, n, n], g: [1, 4], v: 1900 , ov: 1000 },          //活2 --> 活3
            { name: "活2b", a: [n, n, m, m, n, o], g: [4], v: 1900 , ov: 1000 },
            { name: "活2c", a: [n, m, n, m, n, n], g: [2], v: 1900 , ov: 1000 },

            { name: "眠2a", a: [n, n, n, m, m, o], g: [0, 1, 2], v: 300 , ov: 100 },          //眠2 --> 眠3
            { name: "眠2b", a: [n, n, m, n, m, o], g: [0, 1, 3], v: 300 , ov: 100 },
            { name: "眠2c", a: [n, m, n, n, m, o], g: [0, 2, 3], v: 300 , ov: 100 },
            { name: "眠2d", a: [m, n, n, n, m], g: [1, 2, 3], v: 300 , ov: 100 },

            { name: "活1a", a: [n, n, n, m, n, n], g: [1, 2, 4], v: 50 , ov: 20 },          //活1 --> 活2
            { name: "活1b", a: [n, n, n, m, n, o], g: [1, 2], v: 50 , ov: 20 },

            { name: "眠1a", a: [n, n, n, n, m, o], g: [0, 1, 2, 3], v: 30, ov: 10  },          //眠1 --> 眠2

        ];
    }

    judgeEnemy() {
        var m = this.m == 0 ? 1 : 0;
        this.setMe(m);
        var max = this.judge(this.enemyScoreMap, false);
        m = this.m == 0 ? 1 : 0;
        this.setMe(m);
        return max;
    }


    nextPiece() {
        var maxm = this.judge();
        var maxo = this.judgeEnemy();
        console.info({ me: maxm, other: maxo });
        return maxm.v >= maxo.v ? maxm : maxo;
    }

    init() {
        //初始化分值图
        for (var i = 0; i < this.w; i++) {
            this.scoreMap[i] = [];
            this.enemyScoreMap[i] = [];
            for (var j = 0; j < this.h; j++) {
                this.scoreMap[i][j] = 0;
                this.enemyScoreMap[i][j] = 0;
            }
        }
    }


    setScoreMap0(scoreMap) {
        for (var i = 0; i < this.w; i++) {
            for (var j = 0; j < this.h; j++) {
                scoreMap[i][j] = 0;
            }
        }
    }

    get4(y1, x1) {
        var result = [];
        for (var k = 0; k < 8; k++) {
            result[k] = [];
            for (var i = 0; i < 7; i++) {
                var x = x1 + this.p[k][0] * i;
                var y = y1 + this.p[k][1] * i;
                if (x >= 0 && y >= 0 && x < w && y < h) {
                    result[k][i] = {
                        x: x,
                        y: y,
                        v: this.map[y][x]
                    };
                } else {
                    result[k][i] = null;
                }
            }
        }
        // console.info(`x:${x},y:${y}`, result);
        return result;
    }

    rand(a, b) {
        return parseInt(Math.random() * (b - a) + a);
    }

    //计算分值图，返回最大的一个点
    judge(scoreMap, isMe = true) {
        console.info(`m: ${this.m}, o: ${this.o}, isMe: ${isMe}`);
        scoreMap = scoreMap || this.scoreMap;
        this.setScoreMap0(scoreMap);         //分值表初始化为0
        for (var i = 0; i < h; i++) {
            for (var j = 0; j < w; j++) {
                var result = this.get4(i, j);      //获取4个方向的棋子
                this.judge1(scoreMap, result, isMe);
                //最左边一列
                if (j == 0) {
                    for (var k = 1; k < 4; k++) {
                        result[k].unshift(null);
                    }
                    this.judge1(scoreMap, result, isMe);
                }
                //最上边一列
                if (i == 0) {
                    result[0].unshift(null);
                    result[1].unshift(null);
                    result[3].unshift(null);
                    this.judge1(scoreMap, result, isMe);
                }
            }
        }
        var maxScore = { v: 0, x: this.rand(0, this.w), y: this.rand(0, this.h) };
        for (var i = 0; i < h; i++) {
            for (var j = 0; j < w; j++) {
                if (maxScore.v < scoreMap[i][j]) {
                    maxScore = {
                        v: scoreMap[i][j],
                        x: j,
                        y: i
                    };
                }
            }
        }
        return maxScore;
    }


    judge1(scoreMap, result, isMe = true) {
        for (var j in result) {
            for (var i in this.template) {
                var t = this.isTemplate(result[j], this.template[i], isMe);
                if (t) {
                    console.info(t);
                    for (var k = 0; k < t.g.length; k++) {
                        var piece = t.a[t.g[k]];
                        // console.info(piece);
                        scoreMap[piece.y][piece.x] += t.v;          //记录分数
                    }
                    return t;
                }
            }
        }
        return null;
    }



    isTemplate1(rs, tem, isMe = true) {
        var t = { a: [], v: isMe ? tem.v : tem.ov, name: tem.name, g: tem.g };
        // console.info(rs);
        for (var i = 0; i < tem.a.length; i++) {
            if (rs[i] && rs[i].v == this.m && tem.a[i] == this.m) {       //自己的棋子
                // console.info("m");
                t.a.push(rs[i]);
            } else if (rs[i] && rs[i].v == this.n && tem.a[i] == this.n) {       //没有棋子
                // console.info("n");
                t.a.push(rs[i]);
            } else if ((rs[i] == null || rs[i].v == this.o) && tem.a[i] == this.o) {         //不能填的棋子
                // console.info("o");
                t.a.push(rs[i]);
            } else {        //不匹配
                return null;
            }
        }
        return t;
    }

    isTemplate(rs, tem, isMe = true) {
        var t = this.isTemplate1(rs, tem, isMe)
        if (t) {      //正向查找
            return t;
        } else {    //反向查找
            var ra = tem.a.reverse();
            var rg = [];
            for (var i = 0; i < tem.g.length; i++) {
                rg.push(tem.a.length - 1 - tem.g[i]);
            }
            t = this.isTemplate1(rs, { name: "R" + tem.name, a: ra, g: rg, v: tem.v, ov: tem.ov }, isMe);
            tem.a.reverse();    //恢复正向
        }
        return t;
    }
}

