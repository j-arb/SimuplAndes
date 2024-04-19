import AnchorProps from "../Props/AnchorProps";
import ConstraintProps from "../Props/RotConstraintProps";

export default class RotConstraintTool {
    constructor(setLabelText, onToolDone) {
        this.setLabelText = setLabelText;
        this.onToolDone = onToolDone;

        this.constraint = new ConstraintProps();
        this.constraint.setLength(0);
        this.state = "initial";
        this.setLabelText(this.getLabelText());
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
            const offsetX = this.constraint.anchorA.getAbsolutePosition().x -
            anchor.getAbsolutePosition().x;
            const offsetY = this.constraint.anchorA.getAbsolutePosition().y - 
            anchor.getAbsolutePosition().y;
            anchor.body.relativeMove(offsetX, offsetY);
            this.constraint.setAnchorB(anchor);
            this.state = "done";
            this.onToolDone();
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