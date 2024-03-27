import AnchorProps from "../Props/AnchorProps";
import ConstraintProps from "../Props/ConstraintProps";

export default class RotConstraintTool {
    constructor(updateConstraint, setLabelText) {
        this.updateConstraint = updateConstraint;
        this.setLabelText = setLabelText;
        this.constraint = new ConstraintProps();
        this.constraint.setLength(0);
        this.state = "initial";
    }

    isDone() {
        if(this.state === "done") {
            return true;
        }

        return false;
    }

    /**
     * @param {AnchorProps} anchor 
     */
    handleAnchorClick(anchor) {
        if (this.state === "initial") {
            this.state = "anchorADefined";
            this.constraint.setAnchorA(anchor);
            this.setLabelText(this.getLabelText());
        } else if(this.state === "anchorADefined") {
            this.state = "done";
            const offsetX = this.constraint.anchorA.getAbsolutePosition().x -
                anchor.getAbsolutePosition().x;
            const offsetY = this.constraint.anchorA.getAbsolutePosition().y - 
                anchor.getAbsolutePosition().y;
            anchor.body.relativeMove(offsetX, offsetY);
            this.constraint.setAnchorB(anchor);
            this.updateConstraint(this.constraint);
        }
    }

    getLabelText() {
        if(this.state === "initial") {
            return "Seleccione el anclaje A";
        } else if(this.state === "anchorADefined") {
            return "Seleccione el anclaje B";
        }

        return "";
    }
}