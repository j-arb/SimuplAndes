import { Bodies } from "matter-js";
import { Line } from "react-konva";

class PolyProps {
    constructor(id, origin) {
        this.id = id;
        this.origin = origin;
        this.color = "yellow";
        this.stroke = "black";
        this.points = [[origin[0], origin[1]]];
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
        this.points.push([x,y]);
    }

    getPoints() {
        return this.points;
    }
    
    editLastPoint(x,y) {
        const pos = this.points.length - 1;
        this.points[pos] = [x,y];
    }

    drawShapeFunc = (context, shape) => {
        context.beginPath();
        context.moveTo(this.points[0][0], this.points[0][1]);
        this.points.forEach((point) => {
            context.lineTo(point[0], point[1]);
        });
        context.closePath();
        // (!) Konva specific method, it is very important
        context.fillStrokeShape(shape);
    }

    getKonvaPoints() {
        const points = []
        this.points.forEach((pair) => {
            points.push(pair[0]);
            points.push(pair[1]);
        })
        return points;
    }

    getCenterOfMass() {
        let cmx = 0;
        let cmy = 0;

        this.points.forEach((point) => {
            cmx += point[0];
            cmy += point[1];
        });

        cmx = cmx / this.points.length;
        cmy = cmy / this.points.length;

        return [cmx, cmy]
    }

    getMatterJsVertices() {
        const cm = this.getCenterOfMass();
        const vertices = [];
        this.points.forEach((point) => {
            vertices.push({x: point[0] - cm[0], y: point[1] - cm[1]});
        });

        return vertices;
    }

    getMatterJsBody() {
        const cm = this.getCenterOfMass();
        const rect = Bodies.fromVertices(
            cm[0], cm[1],
            this.getMatterJsVertices(),
            {
                mass: 10,
                restitution: 0.9,
                friction: 0.005,
                render: {
                    fillStyle: this.color,
                    strokeStyle: "1px solid " + this.stroke
                }
            }      
        );

        return rect;
    }

    getKonvaComponent() {
        return (
            <Line
                points={this.getKonvaPoints()}
                closed
                fill={this.color}
                stroke={this.stroke}
            />
        )
    }
}

export default PolyProps