import { Bodies } from "matter-js";
import { Circle } from "react-konva";

class CircleProps {
    constructor(id, center, radius) {
        this.id = id;
        this.center = center;
        this.radius = radius;
        this.color = "green";
        this.stroke = "black";
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

    getKonvaComponent() {
        return (
            <Circle
                x={this.center[0]}
                y={this.center[1]}
                radius={this.radius}
                fill={this.color}
                stroke={this.stroke}
            />
        )
    }

    getMatterJsBody() {
        const ball = Bodies.circle(
            this.center[0],
            this.center[1],
            this.radius,
            {
                mass: 10,
                restitution: 0.9,
                friction: 0.005,
                render: {
                    fillStyle: this.color
                }
        });

        return ball
    }
}

export default CircleProps