import PolyProps from "../Bodies/PolyProps";

class PolyTool {
    constructor(id) {
        this.id = id
        this.state = "initial";
        this.body = new PolyProps(id, [0,0]);
    }

    handleClick(e) {
        if (this.state === "initial") {
            const origin = [e.evt.clientX, e.evt.clientY];
            this.body.origin = origin;
            this.body.editLastPoint(origin[0], origin[1]);
            this.body.addPoint(origin[0], origin[1]);
            this.state = "centerDefined";
        } else if (this.state === "centerDefined") {
            // next point. Used to follow mouse move
            this.body.addPoint(e.evt.clientX, e.evt.clientY);
            if(e.evt.ctrlKey) {
                this.state = "done";
            }
        }
    }

    handleMouseMove(e) {
        if (this.state === "centerDefined") {
            this.body.editLastPoint(e.evt.clientX, e.evt.clientY);
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