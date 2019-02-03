(function () {
    var pieceId = 0;
    window.Piece = function (color, id) {
        this.color = color;
        this.id = id || pieceId++;
        console.info(color, this.id);

    }

    Piece.prototype.init = function () {

    }

    Piece.prototype.set = function (p, opacity) {           //放置棋子
        opacity = opacity || 1;
        p.css({
            "background-color": this.color,
            "opacity": opacity,
            "border-radius": '50%',
        });
        p.attr("down", 1);
    }
})();
