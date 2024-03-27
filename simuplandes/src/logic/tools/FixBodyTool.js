class FixBodyTool {
    constructor() {
        this.state = "initial";
    }

    isDone() {
        return this.state === "done";
    }

    getLabelText() {
        if (this.state === "initial") {
            return "Seleccione el cuerpo a fijar";
        } else {
            return "";
        }
    }

    handleBodyClick(body) {
        this.state = "done";
        if(body.isStatic) {
            body.isStatic = false;
            alert("Cuerpo liberado");
        } else {
            body.isStatic = true;
            alert("Cuerpo fijado");
        }
    }
}

export default FixBodyTool;