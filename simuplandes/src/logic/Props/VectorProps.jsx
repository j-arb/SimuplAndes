import { Line } from "react-konva";
import { v4 as uuidv4 } from "uuid";
import KonvaArrow from "../../components/utils/KonvaArrow";
import AnchorProps from "./AnchorProps";

export default class VectorProps {
    // TODO take into account body rotations.
    constructor() {
        this.id = uuidv4();
        /**
         * @type {AnchorProps | null}
         */
        this.anchor = null;
        this.vector = {x: null, y: null};
        this.fixedDirection = true;
        this.color = "black";
    }

    // ======== Getters =========

    getBody() {
        return this.anchor.getBody();
    }

    getAbsoluteOrigin() {
        return this.anchor.getAbsolutePosition();
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