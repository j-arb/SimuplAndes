import VectorProps from "../Props/VectorProps";
import AnchorProps from "../Props/AnchorProps";

export default class VectorTool {
    /**
     * 
     * @param {*} updateVector 
     * @param {*} setLabelText 
     * @param {String} type - either "force" or "velocity"
     */
    constructor(updateVector, setLabelText, type) {
        this.updateVector = updateVector;
        this.setLabelText = setLabelText;
        this.vectorp = new VectorProps();
        if(type === "force") {
            this.vectorp.color = "red";
        } else if(type === "velocity") {
            this.vectorp.color = "green";
        }
        this.setLabelText("Seleccione el anclaje")
        this.state = "initial";
        this.type = type;
    }

    /**
     * @param {AnchorProps} anchor 
     */
    handleAnchorClick(anchor) {
        if(this.state === "initial") {
            const pos = anchor.getAbsolutePosition();
            this.vectorp.setAnchor(anchor);
            if(this.type === "force") {
                anchor.addForce(this.vectorp);
            } else if(this.type === "velocity") {
                anchor.addVelocity(this.vectorp);
            }
            this.vectorp.setOriginAbsolute(pos.x, pos.y);
            this.updateVector(this.vectorp);
            this.setLabelText("Defina el vector");
            this.state = "originDefined";
        }
    }

    handleMouseMove(e) {
        if(this.state === "originDefined") {
            const posX = e.evt.clientX;
            const posY = e.evt.clientY;
            this.vectorp.setVectorEndAbsolute(posX, posY);
            this.updateVector(this.vectorp);
        }
    }

    handleClick(e) {
        if(this.state === "originDefined") {
            const posX = e.evt.clientX;
            const posY = e.evt.clientY;
            this.vectorp.setVectorEndAbsolute(posX, posY);
            this.updateVector(this.vectorp);
            this.state = "done";
        }
    }

    isDone() {
        return this.state === "done";
    }
}