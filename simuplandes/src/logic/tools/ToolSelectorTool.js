import CircleTool from "./CircleTool";

export default class ToolSelectorTool {
    constructor(setTool, setLabelText) {
        this.setTool = setTool;
        setLabelText("c: circulos, r: rectangulos, p: poligonos, f: fijar / liberar cuerpo, " + 
        "a: punto de aclaje, o: restricción rotacional, i: restricción prismatica, " +
        "u: fuerza, v: velocidad, t: torque" + "e: iniciar simulación");
    }

    handleKeyDown(e) {
        if (e.key === "c") {
            this.setTool("circle")
        } else if (e.key === "r") {
            this.setTool("rect")
        } else if(e.key === "p") {
            this.setTool("poly")
        } else if(e.key === "f") {
            this.setTool("fix body");
        } else if(e.key === "a") {
            this.setTool("anchor");
        } else if(e.key === "o") {
            this.setTool("rotConstraint");
        } else if(e.key === "u") {
            this.setTool("force");
        } else if(e.key === "v") {
            this.setTool("velocity");
        } else if(e.key === "t") {
            this.setTool("torque");
        }
    }
}