import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Text } from "react-konva"
import CircleTool from "../../logic/tools/CircleTool";
import RectTool from "../../logic/tools/RectTool";
import PolyTool from "../../logic/tools/PolyTool";
import { useNavigate } from "react-router";

function Editor (props) {
  const [bodies, setBodies] = useState([]);
  const tool = useRef(null);
  const [labelText, setLabelText] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    if (tool.current == null) {
      setTool("none");
    }
  }, [bodies]);

  const onMouseDown = (e) => {
    if(tool.current) {
      tool.current.handleClick(e);
      const bod = tool.current.getBody()
      let bodies2 = [...bodies];
      bodies2[bod.id] = bod;
      setBodies(bodies2);
      setLabelText(tool.current.getLabelText())
      if(tool.current.isDone()) {
        setTool("none");
      }
    }
  }

  const onMouseMove = (e) => {
    if (tool.current) {
      tool.current.handleMouseMove(e);
      if(tool.current.getBody()) {
        const bod = tool.current.getBody();
        let bodies2 = [...bodies];
        bodies2[bod.id] = bod;
        setBodies(bodies2);
      }
    }
  }

  const onKeyDownHanlder = (e) => {
    if (e.key === "c") {
      setTool("circle")
    } else if (e.key === "r") {
      setTool("rect")
    } else if(e.key === "p") {
      setTool("poly")
    } else if(e.key === " ") {
      props.setWorldBodies([...bodies]);
      navigate("/player");
    }
  }

  const setTool = (type) => {
    if (type === "circle") {
      tool.current = new CircleTool(bodies.length);
      setBodies([...bodies, tool.current.getBody()]);
      setLabelText(tool.current.getLabelText());
    } else if(type === "rect") {
      tool.current = new RectTool(bodies.length);
      setBodies([...bodies, tool.current.getBody()]);
      setLabelText(tool.current.getLabelText());
    }
    else if(type === "poly") {
      tool.current = new PolyTool(bodies.length);
      setBodies([...bodies, tool.current.getBody()]);
      setLabelText(tool.current.getLabelText());
    } else if(type === "none") {
      tool.current = null;
      setLabelText("Presione 'c' para circulos, 'r' para rectangulos y 'p' para polígonos")
    }
  }

  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
    // Rect and Circle are not DOM elements. They are 2d shapes on canvas
    <div onKeyDown={onKeyDownHanlder} tabIndex="0">
      <Stage width={window.innerWidth} height={window.innerHeight}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}>
        <Layer>
          <Text text={labelText} />
          {bodies.map((body) => {
            return body.getKonvaComponent()
          })}
        </Layer>
      </Stage>
    </div>
  );
}

export default Editor