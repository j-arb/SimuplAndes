import { Bodies, Vertices } from "matter-js";
import { Line } from "react-konva";

class PolyProps {
    constructor(id, origin) {
        this.id = id;
        this.origin = origin;
        this.color = "yellow";
        this.stroke = "black";
        this.vertices = [{x: origin[0], y: origin[1]}];
        this.isStatic = false;
        this.anchors = [];
        this.matterJsBody = null;
    }

    relativeMove(x, y) {
        this.vertices.forEach((vertex, i) => {
            const newX = vertex.x + x;
            const newY = vertex.y + y;
            this.vertices[i] = {x: newX, y: newY};
        });
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

    getType() {
        return "poly";
    }

    addPoint(x, y) {
        this.vertices.push({x: x, y: y});
    }

    getVertices() {
        return this.vertices;
    }
    
    editLastPoint(x,y) {
        const pos = this.vertices.length - 1;
        this.vertices[pos] = {x: x, y: y};
    }

    getKonvaPoints() {
        const points = []
        this.vertices.forEach((vertex) => {
            points.push(vertex.x);
            points.push(vertex.y);
        })
        return points;
    }

    getCenter() {
        const vertices = Vertices.hull(this.vertices);
        return Vertices.centre(vertices);
    }

    getRelativeVertices() {
        const cm = this.getCenter();
        const vertices = [];
        this.vertices.forEach((vertex) => {
            vertices.push({x: vertex.x - cm.x, y: vertex.y - cm.y});
        });

        return Vertices.clockwiseSort(vertices);
    }

    resetMatterJsBody() {
        this.matterJsBody = null;
    }

    getMatterJsBody() {
        if(!this.matterJsBody) {
            const cm = this.getCenter();
            let vertices = this.getRelativeVertices();
            vertices = Vertices.hull(vertices);
    
            this.matterJsBody = Bodies.fromVertices(
                cm.x, cm.y,
                vertices,
                {
                    mass: 10,
                    restitution: 0.9,
                    friction: 0.005,
                    render: {
                        fillStyle: this.color,
                        strokeStyle: "1px solid " + this.stroke
                    },
                    isStatic: this.isStatic
                }      
            );
        }

        return this.matterJsBody;
    }

    getKonvaComponent(onBodyClick, onAnchorClick) {
        return (
            <>
                <Line
                    points={this.getKonvaPoints()}
                    closed
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

    getArea() {
        const vertices = this.getMatterVertices();
        let area = 0;
        for (let i = 0; i < vertices.length - 1; i++) {
            let v = vertices[i];
            let vn = vertices[i + 1];
            area += (v.x * vn.y - vn.x * v.y) / 2;
        }

        return area;
    }
}

export default PolyProps