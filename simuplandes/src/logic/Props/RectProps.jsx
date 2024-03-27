import { Bodies } from "matter-js";
import { Rect } from "react-konva";

class RectProps {
    constructor(id, origin, width, height, onClick) {
        this.id = id;
        this.origin = origin;
        this.width = width;
        this.height = height;
        this.color = "red";
        this.stroke = "black";
        this.isStatic = false;
        this.anchors = [];
        this.matterJsBody = null;
    }

    relativeMove(x, y) {
        this.origin[0] += x;
        this.origin[1] += y;
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
        return {x: x, y: y};
    }

    getKonvaComponent(onBodyClick, onAnchorClick) {
        return (
            <>
                <Rect
                    x={this.origin[0]}
                    y={this.origin[1]}
                    height={this.height}
                    width={this.width}
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
        if(!this.matterJsBody) {
            this.matterJsBody = Bodies.rectangle(
                this.getCenter().x,
                this.getCenter().y,
                this.width,
                this.height,
                {
                    mass: 10,
                    restitution: 0.9,
                    friction: 0.005,
                    render: {
                        fillStyle: this.color,
                        strokeStyle: "1px solid" + this.stroke
                    },
                    isStatic: this.isStatic
                }      
            );
        }

        return this.matterJsBody;
    }
}

export default RectProps