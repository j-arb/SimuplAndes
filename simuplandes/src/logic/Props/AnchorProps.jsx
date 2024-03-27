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
        this.position.x = x - this.body.getCenter().x;
        this.position.y = y - this.body.getCenter().y;
    }

    getBody() {
        return this.body;
    }

    getRelativePosition() {
        return this.position;
    }

    getAbsolutePosition() {
        const x = this.position.x + this.body.getCenter().x;
        const y = this.position.y + this.body.getCenter().y;
        return {x: x, y: y};
    }

    getKonvaComponent(onAnchorClick) {
        const absPos = this.getAbsolutePosition();
        return (
            <Circle
                x={absPos.x}
                y={absPos.y}
                radius={5}
                fill="white"
                stroke="gray"
                onClick={() => {onAnchorClick(this)}}
            />
        );
    }
}

export default AnchorProps;