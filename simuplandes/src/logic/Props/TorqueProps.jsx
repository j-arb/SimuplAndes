import { v4 as uuidv4 } from "uuid";

export default class TorqueProps {
    constructor() {
        this.id = uuidv4();
        this.body = null;
        this.relativeOrigin = {x: null, y: null};
        this.torque = null;
    }

    getAbsoluteOrigin() {
        const bodyOrigin = this.body.getCenter();
        const x = bodyOrigin.x + this.relativeOrigin.x;
        const y = bodyOrigin.y + this.relativeOrigin.y;
        return {x: x, y: y};
    }

    setOrigin(x, y) {
        const bodyOrigin = this.body.getCenter();
        const x_rel = x - bodyOrigin.x;
        const y_rel = y - bodyOrigin.y;
        this.relativeOrigin = {x: x_rel, y: y_rel};
    }

    setBody(body) {
        this.body = body;
    }

    setTorque(torque) {
        torque = this.torque;
    }
}