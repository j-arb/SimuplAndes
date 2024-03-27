import PolyProps from "../Props/PolyProps";

class PolyTool {
    constructor(id, updateBody, setLabelText) {
        this.id = id
        this.state = "initial";
        this.body = new PolyProps(id, [0,0]);
        this.updateBody = updateBody;
        this.setLabelText = setLabelText;
    }

    handleClick(e) {
        if (this.state === "initial") {
            this.state = "centerDefined";
            const origin = [e.evt.clientX, e.evt.clientY];
            this.body.origin = origin;
            this.body.editLastPoint(origin[0], origin[1]);
            this.body.addPoint(origin[0], origin[1]);
            this.updateBody(this.body);
            this.setLabelText(this.getLabelText());
        } else if (this.state === "centerDefined") {
            // next point. Used to follow mouse move
            this.body.addPoint(e.evt.clientX, e.evt.clientY);
            if(e.evt.ctrlKey) {
                this.state = "done";
            }
            this.updateBody(this.body);
        }
    }

    handleMouseMove(e) {
        if (this.state === "centerDefined") {
            this.body.editLastPoint(e.evt.clientX, e.evt.clientY);
            this.updateBody(this.body);
        }
    }

    getBody() {
        return this.body;
    }

    isDone() {
        return this.state === "done";
    }

    getLabelText() {
        if (this.state === "initial" | this.state === "centerDefined") {
            return "Seleccione un punto. Ctrl + click para terminar.";
        } else {
            return "";
        }
    }
}

export default PolyTool;