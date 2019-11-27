const app = new Vue({
    el: "#book-graph",
    data: {
        areas: {},
        elementID: "",
        isRect: true,
        position: {
            x: 0,
            y: 0,
        },
    },
    mounted() {
        this.addArea();
    },
    methods: {
        addArea(c) {
            const id = this.makeid(10);

            c = c || { x: 20, y: 50 };


            const opts = {
                pos: { x: c.x, y: c.y },
                size: { w: 100, h: 100 },
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
            }


            this.$set(this.areas, id, opts);
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
        dragRect($event, isRect, elementID) {
            if ($event.which !== 1) {
                return;
            }

            this.elementID = elementID;
            this.isRect = isRect;

            const clientX = $event.clientX
            const clientY = $event.clientY

            const root = this.$refs.root;

            this.position.x = clientX;
            this.position.y = clientY;

            root.onmouseup = this.stopDragging;
            root.onmousemove = this.startDragging;
        },
        startDragging($event) {

            const clientX = $event.clientX
            const clientY = $event.clientY

            const delteX = this.position.x - clientX;
            const delteY = this.position.y - clientY;

            const area = this.areas[this.elementID];

            if (this.isRect) {
                area.pos.x -= delteX;
                area.pos.y -= delteY;
            } else {
                area.circleX -= delteX;
                area.circleY -= delteY;
            }

            this.position.x = clientX;
            this.position.y = clientY;
        },
        stopDragging() {
            const root = this.$refs.root;

            root.onmouseup = null;
            root.onmousemove = null;

            this.position.x = 0;
            this.position.y = 0;
        },
        onDelete() {

            if (this.elementID in this.areas) {
                this.$delete(this.areas, this.elementID)
            }
        }
    },
});
