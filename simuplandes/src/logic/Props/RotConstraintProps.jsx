import { Constraint } from "matter-js";
import { v4 as uuidv4 } from "uuid";

export default class RotConstraintProps {
    constructor() {
        this.id = uuidv4();
        this.anchorA = null;
        this.anchorB = null;
        this.length = 0;
        this.stiffness = 1;
    }

    getId() {
        return this.id;
    }

    setAnchorA(anchor) {
        this.anchorA = anchor;
    }

    setAnchorB(anchor) {
        this.anchorB = anchor;
    }

    setLength(length) {
        this.length = length;
    }

    setStiffness(stiffness) {
        this.stiffness = stiffness;
    }

    getMatterJsConstraint() {
        return Constraint.create({
            bodyA: this.anchorA.body.getMatterJsBody(),
            bodyB: this.anchorB.body.getMatterJsBody(),
            pointA: {...this.anchorA.position},
            pointB: {...this.anchorB.position},
            length: this.length,
            stiffness: this.stiffness,
            render: {
                anchors: false
            }
            
        });
    }
}