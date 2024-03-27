import CircleProps from "../Props/CircleProps";

class CircleTool {
    constructor(id, updateBody, setLabelText) {
        this.id = id
        this.state = "initial";
        this.circle = new CircleProps(this.id, [0,0], 0);
        this.setLabelText = setLabelText;
        this.updateBody = updateBody;
    }

    handleClick(e) {
        if (this.state === "initial") {
            const center = [e.evt.clientX, e.evt.clientY];
            this.circle.center = center;
            this.state = "centerDefined";
            this.updateBody(this.circle);
            this.setLabelText(this.getLabelText());
        } else if (this.state === "centerDefined") {
            this.state = "done";
            const x1 = this.circle.center[0]
            const y1 = this.circle.center[1]
            const x2 = e.evt.clientX;
            const y2 = e.evt.clientY;
            const rad = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
            this.circle.radius = rad;
            this.updateBody(this.circle);
            this.setLabelText(this.getLabelText());
        }
    }

    handleMouseMove(e) {
        if (this.state === "centerDefined") {
            const x1 = this.circle.center[0]
            const y1 = this.circle.center[1]
            const x2 = e.evt.clientX;
            const y2 = e.evt.clientY;
            const rad = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
            this.circle.radius = rad;
            this.updateBody(this.circle);
        }
    }

    getBody() {
        return this.circle;
    }

    isDone() {
        return this.state === "done";
    }

    getLabelText() {
        if (this.state === "initial") {
            return "Seleccione el centro del circulo";
        } else if (this.state === "centerDefined") {
            return "Seleccione el radio del circulo";
        } else {
            return "";
        }
    }
}

export default CircleTool;