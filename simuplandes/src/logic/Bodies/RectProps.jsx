import { Bodies } from "matter-js";
import { Rect } from "react-konva";

class RectProps {
    constructor(id, origin, width, height) {
        this.id = id;
        this.origin = origin;
        this.width = width;
        this.height = height;
        this.color = "red";
        this.stroke = "black";
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
        const x = this.origin[0] + (this.width / 2);
        const y = this.origin[1] + (this.height / 2);
        return [x, y];
    }

    getKonvaComponent() {
        return (
            <Rect
                x={this.origin[0]}
                y={this.origin[1]}
                height={this.height}
                width={this.width}
                fill={this.color}
                stroke={this.stroke}
            />
        )
    }

    getMatterJsBody() {
        const rect = Bodies.rectangle(
            this.getCenter()[0],
            this.getCenter()[1],
            this.width,
            this.height,
            {
                mass: 10,
                restitution: 0.9,
                friction: 0.005,
                render: {
                    fillStyle: this.color,
                    strokeStyle: "1px solid" + this.stroke
                }
            }      
        );

        return rect;
    }
}

export default RectProps