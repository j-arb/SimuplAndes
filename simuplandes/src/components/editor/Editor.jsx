import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Text } from "react-konva"
import CircleTool from "../../logic/tools/CircleTool";
import RectTool from "../../logic/tools/RectTool";
import PolyTool from "../../logic/tools/PolyTool";
import { useNavigate } from "react-router";
import FixBodyTool from "../../logic/tools/FixBodyTool";
import AnchorTool from "../../logic/tools/AnchorTool";
import RotConstraintTool from "../../logic/tools/RotConstraintTool";
import ConstraintProps from "../../logic/Props/ConstraintProps";

function Editor (props) {
  const noToolLabelText = "1: circulos, 2: rectangulos, 3: poligonos, 4: fijar / liberar cuerpo, " + 
                          "5: punto de aclaje, 6: restricción rotacional, p: iniciar simulación"
  const [bodies, setBodies] = useState(props.worldBodies);
  const [constraints, setConstraints] = useState(props.worldConstraints);
  const tool = useRef(null);
  const [labelText, setLabelText] = useState(noToolLabelText)
  const navigate = useNavigate();
  const [popUp, setPopUp] = useState(null);
  const mainDiv = useRef();

  useEffect(() => {
    mainDiv.current.focus();
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

      if(tool.current.isDone()) {
        setTool("none");
      }
    }
  }

  const updateBody = (body) => {
    const bodies2 = [...bodies];
    bodies2[body.id] = body;
    setBodies(bodies2); 
  }

  /**
   * @param {ConstraintProps} constraint 
   */
  const updateConstraint = (constraint)  => {
    const constraints2 = {...constraints};
    constraints2[constraint.id] = constraint;
    setConstraints(constraints2);
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
    } else if(e.key === "6") {
      setTool("constraint");
    } else if(e.key === "p") {
      navigate("/player");
      const constraints2 = {...constraints};
      const bodies2 = [...bodies];
      props.setWorldConstraints(constraints2);
      props.setWorldBodies(bodies2);
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
    } else if(type === "poly") {
      tool.current = new PolyTool(bodies.length, updateBody, setLabelText);
      setBodies([...bodies, tool.current.getBody()]);
      setLabelText(tool.current.getLabelText());
    } else if(type === "fix body") {
      tool.current = new FixBodyTool();
      setLabelText(tool.current.getLabelText());
    } else if(type === "anchor") {
      tool.current = new AnchorTool(updateBody, setLabelText);
      setLabelText(tool.current.getLabelText());
    } else if(type === "constraint") {
      tool.current = new RotConstraintTool(updateConstraint, setLabelText);
      setLabelText(tool.current.getLabelText());
    } else if(type === "none") {
      tool.current = null;
      setLabelText(
        noToolLabelText
      );
    }
  }

  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
    // Rect and Circle are not DOM elements. They are 2d shapes on canvas
    <div onKeyDown={onKeyDownHanlder} tabIndex="0" ref={mainDiv}>
      { popUp ? popUp : <></> }
      <Stage width={window.innerWidth} height={window.innerHeight}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}>
        <Layer>
          <Text text={labelText} />
          {bodies.map((body) => {
            return body.getKonvaComponent(onBodyClick, onAnchorClick)
          })}
        </Layer>
      </Stage>
    </div>
  );
}

export default Editor