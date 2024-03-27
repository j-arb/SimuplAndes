import { Circle } from "react-konva";
import { v4 as uuidv4 } from "uuid";

class AnchorProps {
    constructor() {
        this.id = uuidv4();
        this.body = null;
        this.position = {x: null, y: null};
    }

    setBody(body) {
        this.body = body;
    }

    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    getBody() {
        return this.body;
    }

    getPosition() {
        return this.position;
    }

    getKonvaComponent(onAnchorClick) {
        return (
            <Circle
                x={this.position.x}
                y={this.position.y}
                radius={5}
                fill="white"
                stroke="gray"
            />
        );
    }
}

export default AnchorProps;