import { Line } from "react-konva";
import { v4 as uuidv4 } from "uuid";
import KonvaArrow from "../../components/utils/KonvaArrow";

export default class VectorProps {
    // TODO take into account body rotations.
    constructor() {
        this.id = uuidv4();
        this.anchor = null;
        this.relativeOrigin = {x: null, y: null};
        this.vector = {x: null, y: null};
        this.fixedDirection = true;
        this.color = "black";
    }

    // ======== Getters =========

    getBody() {
        return this.anchor.getBody();
    }

    getAbsoluteOrigin() {
        const bodyOrigin = this.anchor.getBody().getCenter();
        const x = bodyOrigin.x + this.relativeOrigin.x;
        const y = bodyOrigin.y + this.relativeOrigin.y;
        return {x: x, y: y};
    }

    getMagnitude() {
        return Math.sqrt( Math.pow(this.vector.x, 2) + Math.pow(this.vector.y, 2) );
    }

    getRelativeVector() {
        return this.vector;
    }

    getAbsoluteVectorEnd() {
        const absOrigin = this.getAbsoluteOrigin();
        return {x: this.vector.x + absOrigin.x, y: this.vector.y + absOrigin.y};
    }

    getKonvaComponent() {
        const absOrigin = this.getAbsoluteOrigin();
        const absVecEnd = this.getAbsoluteVectorEnd();
        return (
            <KonvaArrow
                start={absOrigin}
                end={absVecEnd}
                color={this.color}
            />
        )
    }

    // ======== Setters =========

    setVectorAbsolute(x, y) {
        this.vector = {x: x, y: y};
    }

    setVectorEndAbsolute(x, y) {
        const absOrigin = this.getAbsoluteOrigin();
        const xv = x - absOrigin.x;
        const yv = y - absOrigin.y;
        this.vector = {x: xv, y: yv};
    }

    setOriginAbsolute(x, y) {
        const bodyOrigin = this.anchor.getBody().getCenter();
        const x_rel = x - bodyOrigin.x;
        const y_rel = y - bodyOrigin.y;
        this.relativeOrigin = {x: x_rel, y: y_rel};
    }

    setOriginRelative(x, y) {
        this.relativeOrigin = {x: x, y: y};
    }

    setAnchor(anchor) {
        this.anchor = anchor;
    }

    setRelativeDirection() {
        this.fixedDirection = false;
    }

    setFixedDirection() {
        this.fixedDirection = true;
    }
}