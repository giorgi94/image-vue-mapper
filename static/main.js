const app = new Vue({
    el: "#book-graph",
    data: {
        areas: {},
        elementID: "",
        tagName: "",
        position: {
            x: 0,
            y: 0,
        },
    },
    mounted() {
        this.addArea();
    },
    methods: {
        addArea(c = {}, id) {
            id = id || this.uniqueid();

            c = { x: 20, y: 50, w: 100, h: 100, ...c };


            const opts = {
                pos: { x: c.x, y: c.y },
                size: { w: c.w, h: c.h },
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
        uniqueid() {
            let id = this.makeid(10);
            const ids = Object.keys(this.areas)

            while (true) {
                if (ids.indexOf(id) === -1) {
                    return id;
                }
                id = this.makeid(10);
            }
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
        dragRect($event, tagName, elementID) {
            if ($event.which !== 1) {
                return;
            }

            this.elementID = elementID;
            this.tagName = tagName;

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

            if (this.tagName === 'rect') {
                area.pos.x -= delteX;
                area.pos.y -= delteY;
            } else if (this.tagName === 'circle') {
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
