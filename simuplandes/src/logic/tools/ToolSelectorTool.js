import CircleTool from "./CircleTool";

export default class ToolSelectorTool {
    constructor(setTool, setLabelText) {
        this.setTool = setTool;
        setLabelText("");
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

    isDone() {
        return true;
    }
}