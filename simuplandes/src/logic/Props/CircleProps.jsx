import { Bodies } from "matter-js";
import { Circle } from "react-konva";

class CircleProps {
    constructor(id, center, radius) {
        this.id = id;
        this.center = center;
        this.radius = radius;
        this.color = "green";
        this.stroke = "black";
        this.isStatic = false;
        this.anchors = [];
        this.matterJsBody = null;
    }

    addAnchor(anchor) {
        this.anchors.push(anchor);
    }

    getAnchors() {
        return this.anchors;
    }

    getId() {
        return this.id;
    }

    getCenter() {
        return {x: this.center[0], y: this.center[1]};
    }

    getRadius() {
        return this.radius;
    }

    getType() {
        return "circle";
    }

    relativeMove(x, y) {
        this.center[0] += x;
        this.center[1] += y;
    }

    getKonvaComponent(onBodyClick, onAnchorClick) {
        return (
            <>
                <Circle
                    x={this.center[0]}
                    y={this.center[1]}
                    radius={this.radius}
                    fill={this.color}
                    stroke={this.stroke}
                    onClick={() => {onBodyClick(this);}}
                />
                {
                    this.anchors.map((anchor) => {
                        return anchor.getKonvaComponent(onAnchorClick);
                    })
                }
            </>
        )
    }

    resetMatterJsBody() {
        this.matterJsBody = null;
    }

    
    getMatterJsBody() {
        if (!this.matterJsBody) {
            this.matterJsBody = Bodies.circle(
                this.center[0],
                this.center[1],
                this.radius,
                {
                    mass: 10,
                    restitution: 0.9,
                    friction: 0.005,
                    render: {
                        fillStyle: this.color
                    },
                    isStatic: this.isStatic
            });
        }

        return this.matterJsBody;
    }
}

export default CircleProps