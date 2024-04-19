import CircleProps from "./CircleProps";
import PolyProps from "./PolyProps";
import RectProps from "./RectProps";
import RotConstraintProps from "./RotConstraintProps";

export default class WorldProps {
    /**
     * @type {(CircleProps | PolyProps | RectProps)[]}
     */
    bodies = [];

    /**
     * @type {Object.<string, RotConstraintProps>}
     */
    rotConstraints = {};

    /**
     * @type {Object.<string, any>}
     */
    prisConstraints = {};

    addBody(body) {
        this.bodies.push(body);
    }

    removeBody(body) {
        const bodies2 = this.bodies.filter((element) => {
            if(element.id === body.id) {
                return false
            }
            return true;
        });

        this.bodies = bodies2;
    }

    getBodyList() {
        return this.bodies;
    }

    addRotConstraint(constraint) {
       this.rotConstraints[constraint.id] = constraint;
    }

    removeRotConstraint(constraint) {
        delete this.rotConstraints[constraint.id];
    }

    getRotConstraintList() {
        return Object.values(this.rotConstraints);
    }

    addPrisConstraint(constarint) {
        this.prisConstraints[constarint.id] = constarint;
    }

    removePrisConstraint(constarint) {
        delete this.prisConstraints[constarint.id];
    }

    getPrisConstraintsList() {
        return Object.values(this.prisConstraints);
    }
}