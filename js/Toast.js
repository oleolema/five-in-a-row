class Toast {

    constructor(text, delay) {
        this.text = text;
        this.delay = delay || 5000;
        this.toast = null;
        this.start();
    }

    start() {
        this.toast = $(`<div class="alert alert-success alert-dismissible fade show" style="transition:all 0.5s;">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            ${this.text}
                        </div>`);
        $(".toast").append(this.toast);
        this.close();
    }

    close() {
        this.timer = setTimeout(() => {
            this.toast[0].children[0].click();
        }, this.delay);
    }
}
