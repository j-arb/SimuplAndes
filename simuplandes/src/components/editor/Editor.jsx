import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Text } from "react-konva"
import CircleTool from "../../logic/tools/CircleTool";
import RectTool from "../../logic/tools/RectTool";
import PolyTool from "../../logic/tools/PolyTool";
import VectorTool from "../../logic/tools/VectorTool";
import { useNavigate } from "react-router";
import FixBodyTool from "../../logic/tools/FixBodyTool";
import AnchorTool from "../../logic/tools/AnchorTool";
import RotConstraintTool from "../../logic/tools/RotConstraintTool";
import ToolSelectorTool from "../../logic/tools/ToolSelectorTool";
import { useReducer } from "react";
import TorqueTool from "../../logic/tools/TorqueTool";
import Css from "./Editor.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

function Editor (props) {

  /**
   * @type {React.MutableRefObject<WorldProps | null>}
   */
  const worldProps = props.worldProps;
  const [labelText, setLabelText] = useState("");
  const [tool, _setTool] = useState();
  const [popUp, setPopUp] = useState(null);
  const [, updateEditor] = useReducer(x => x + 1, 0);
  const navigate = useNavigate();
  /**
   * @type {React.MutableRefObject<HTMLDivElement | null>}
   */
  const mainDiv = useRef(null);

  useEffect(() => {
    mainDiv.current.focus();
    setTool("toolSelect");
  }, []);

  // const updateEditor = () => {
  //   console.log("1");
  //   setRefreshCount(refreshCount + 1);
  // }

  // ======== EVENT HANDLERS ========

  const onMouseDown = (e) => {
    if(tool.handleClick) {
      tool.handleClick(e);
    }
  }

  const onMouseMove = (e) => {
    if(tool.handleMouseMove) {
      tool.handleMouseMove(e);
    }
  }

  const onBodyClick = (body) => {
    if (tool.handleBodyClick) {
      tool.handleBodyClick(body);
    }
  }

  const onAnchorClick = (anchor) => {
    if (tool.handleAnchorClick) {
      tool.handleAnchorClick(anchor);
    }
  }

  const onToolDone = () => {
    setTool("toolSelect");
  }

  const onKeyDownHanlder = (e) => {
    if (tool.handleKeyDown) {
      tool.handleKeyDown(e);
    }
  }

  const setTool = (type) => {
    
    if (type === "circle") {
      _setTool(new CircleTool(worldProps.current, setLabelText, onToolDone, updateEditor));
    } else if(type === "rect") {
      _setTool(new RectTool(worldProps.current, setLabelText, onToolDone, updateEditor));
    } else if(type === "poly") {
      _setTool(new PolyTool(worldProps.current, setLabelText, onToolDone, updateEditor));
    } else if(type === "fix body") {
      _setTool(new FixBodyTool(setLabelText, onToolDone));
    } else if(type === "anchor") {
      _setTool(new AnchorTool(setLabelText, onToolDone));
    } else if(type === "rotConstraint") {
      _setTool(new RotConstraintTool(setLabelText, onToolDone));
    } else if(type === "force") {
      _setTool(new VectorTool(setLabelText, onToolDone, updateEditor, "force"));
    } else if(type === "velocity") {
      _setTool(new VectorTool(setLabelText, onToolDone, updateEditor, "velocity"));
    } else if(type === "torque") {
      _setTool(new TorqueTool(setLabelText, onToolDone));
    } else if(type === "toolSelect") {
      _setTool(new ToolSelectorTool(setTool, setLabelText));
    }
  }

  const playSimulation = () => {
    navigate("/player")
  }

  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
    // Rect and Circle are not DOM elements. They are 2d shapes on canvas
    <div onKeyDown={onKeyDownHanlder} tabIndex="0" ref={mainDiv}>
      { popUp ? popUp : <></> }
      <div className={Css.playBtnDiv}>
        <button className={Css.playBtn + " btn"} onClick={playSimulation}>
          <FontAwesomeIcon icon={faPlay} className={Css.playBtnIcon} />
        </button>
      </div>
      <Stage width={window.innerWidth} height={window.innerHeight}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}>
        <Layer>
          <Text text={labelText} />
          {worldProps.current.getBodyList().map((body) => {
            return body.getKonvaComponent(onBodyClick, onAnchorClick)
          })}
        </Layer>
      </Stage>
    </div>
  );
}

export default Editor