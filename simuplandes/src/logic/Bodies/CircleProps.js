class CircleProps {
    constructor(id, center, radius) {
        this.id = id;
        this.center = center;
        this.radius = radius;
    }

    getId() {
        return this.id;
    }

    getCenter() {
        return this.center;
    }

    getRadius() {
        return this.radius;
    }

    getType() {
        return "circle";
    }
}

export default CircleProps