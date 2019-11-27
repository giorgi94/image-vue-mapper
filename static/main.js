const app = new Vue({
    el: "#book-graph",
    data: {
        areas: {},
        element: null,
        position: {
            x: 0,
            y: 0,
        },
    },
    mounted() {
        this.addArea({
            pos: {
                x: 20,
                y: 50,
            },
            size: {
                w: 80,
                h: 100,
            },
            circleR: 3.5,
            get circleX() {
                return this.pos.x + this.size.w - this.circleR / 2;
            },
            set circleX(v) {
                this.size.w = v - this.pos.x + this.circleR / 2;
            },
            get circleY() {
                return this.pos.y + this.size.h - this.circleR / 2;
            },
            set circleY(v) {
                this.size.h = v - this.pos.y + this.circleR / 2;
            },
        });
    },
    methods: {
        addArea(options = {}) {
            const id = this.makeid(10);
            this.$set(this.areas, id, options);
        },
        makeid(length) {
            let result = "";
            let characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            let charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result +=
                    characters[Math.floor(Math.random() * charactersLength)];
            }
            return result;
        },
        dragRect(e) {
            if (e.which !== 1) {
                return;
            }
            const root = this.$refs.root;

            this.element = e.target;

            this.position.x = e.clientX;
            this.position.y = e.clientY;

            root.onmouseup = this.stopDragging;
            root.onmousemove = this.startDragging;
        },
        startDragging(e) {
            const ID = this.element.dataset.id;

            const delteX = this.position.x - e.clientX;
            const delteY = this.position.y - e.clientY;

            const area = this.areas[ID];

            const isRect = this.element.tagName.toLowerCase() === "rect";

            if (isRect) {
                area.pos.x -= delteX;
                area.pos.y -= delteY;
            } else {
                area.circleX -= delteX;
                area.circleY -= delteY;
            }

            this.position.x = e.clientX;
            this.position.y = e.clientY;
        },
        stopDragging() {
            const root = this.$refs.root;

            root.onmouseup = null;
            root.onmousemove = null;

            this.element = null;

            this.position.x = 0;
            this.position.y = 0;
        },
    },
});
