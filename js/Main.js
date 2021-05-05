var w = 13;
var h = 13;

var bgObj = new Background(w, h);       //创建一个棋盘
var checkObj = new Check(bgObj);       //创建一个检查棋盘类
var roundObj = new Round(bgObj);       //创建一个记录每一回合的类

var piece1 = new Piece('black');       //创建2种棋子
var piece2 = new Piece('white');

var computer1 = new Computer(piece1);                //其中一颗棋子由ai控制
var player1 = new Player(piece2);         //其中一颗由玩家控制
var ai = new Ai(bgObj, computer1);
bgObj.addPlayer(computer1, player1);

init();         //初始化

function init() {
    bgObj.init();       //初始棋盘
    roundObj.init();
    // AI 先手
    // piece1.set(roundObj.pieceCur, 0.5);
}
function f() {
    var result = ai.get4(0, 0);
    for (var rs in result) {
        var t = ai.isTemplate(result[rs], ai.template[15]);
        if (t) {
            console.info(true);
            console.info(t)
        } else {
            console.info(false);
        }
    }
}