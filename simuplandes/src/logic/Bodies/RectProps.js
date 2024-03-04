class RectProps {
    constructor(id, center, width, height) {
        this.id = id;
        this.origin = origin;
        this.width = width;
        this.height = height;
    }

    getId() {
        return this.id;
    }

    getOrigin() {
        return this.origin;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getType() {
        return "rect";
    }

    getCenter() {
        const x = (this.origin[0] + this.width) / 2;
        const y = (this.origin[1] + this.height) / 2;
        return [x, y];
    }
}

export default RectProps