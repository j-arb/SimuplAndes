import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Text } from "react-konva"
import CircleTool from "../../logic/tools/CircleTool";
import RectTool from "../../logic/tools/RectTool";
import PolyTool from "../../logic/tools/PolyTool";
import { useNavigate } from "react-router";
import FixBodyTool from "../../logic/tools/FixBodyTool";
import AnchorTool from "../../logic/tools/AnchorTool";

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
      if(tool.current.handleClick) {
        tool.current.handleClick(e);
        
        if(tool.current.isDone()) {
          setTool("none");
        }
      }
    }
  }

  const onMouseMove = (e) => {
    if (tool.current) {
      if(tool.current.handleMouseMove) {
        tool.current.handleMouseMove(e);
      }
    }
  }

  const onBodyClick = (body) => {
    if (tool.current && tool.current.handleBodyClick) {
      tool.current.handleBodyClick(body);

      if(tool.current.isDone()) {
        setTool("none");
      }
    }
  }

  const onAnchorClick = (anchor) => {
    if (tool.current && tool.current.handleAnchorClick) {
      tool.current.handleAnchorClick(anchor);
    }
  }

  const updateBody = (body) => {
    const bodies2 = [...bodies];
    bodies2[body.id] = body;
    setBodies(bodies2); 
  }


  const onKeyDownHanlder = (e) => {
    if (e.key === "1") {
      setTool("circle")
    } else if (e.key === "2") {
      setTool("rect")
    } else if(e.key === "3") {
      setTool("poly")
    } else if(e.key === "4") {
      setTool("fix body");
    } else if(e.key === "5") {
      setTool("anchor");
    }else if(e.key === " ") {
      props.setWorldBodies([...bodies]);
      navigate("/player");
    }
  }


  const setTool = (type) => {
    if (type === "circle") {
      tool.current = new CircleTool(bodies.length, updateBody, setLabelText);
      setBodies([...bodies, tool.current.getBody()]);
      setLabelText(tool.current.getLabelText());
    } else if(type === "rect") {
      tool.current = new RectTool(bodies.length, updateBody, setLabelText);
      setBodies([...bodies, tool.current.getBody()]);
      setLabelText(tool.current.getLabelText());
    }
    else if(type === "poly") {
      tool.current = new PolyTool(bodies.length, updateBody, setLabelText);
      setBodies([...bodies, tool.current.getBody()]);
      setLabelText(tool.current.getLabelText());
    } else if(type === "fix body") {
      tool.current = new FixBodyTool();
      setLabelText(tool.current.getLabelText());
    } else if(type === "anchor") {
      tool.current = new AnchorTool(updateBody, setLabelText);
      setLabelText(tool.current.getLabelText());
    } else if(type === "none") {
      tool.current = null;
      setLabelText("1: circulos, 2: rectangulos, 3: poligonos, 4: fijar / liberar cuerpo, 5: añadir una fijación");
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
            return body.getKonvaComponent(onBodyClick)
          })}
        </Layer>
      </Stage>
    </div>
  );
}

export default Editor