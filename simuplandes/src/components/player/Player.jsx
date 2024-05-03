import { useEffect, useRef, useState } from 'react'
import { Engine, Render, Bodies, Runner, Composite } from 'matter-js'
import { useNavigate } from 'react-router';
import Css from "./Player.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

export default function Player (props) {
  const scene = useRef();
  const navigate = useNavigate();
  const engine = useRef(Engine.create());
  const runner = useRef(Runner.create());
  const [ppIcon, setPpIcon] = useState(faPause);
  
  useEffect(() => {
    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;

    const worldBodies = props.worldProps.current.getBodyList();
    const worldConstraints = props.worldProps.current.getRotConstraintList();

    scene.current.focus();

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent'
      }

    });

    if (worldBodies.length > 32) {
      alert("There are more than 32 bodies. Collisions will not be detected");
    }

    worldBodies.forEach((body) => {
      body.resetMatterJsBody();
      // const matterJsBody = body.getMatterJsBody();
      // const group = (worldBodies.length <= 32) ? 0 : -1;
      // const category = (worldBodies.length <= 32) ? Math.pow(2, body.id) : 1;
      // matterJsBody.collisionFilter.group = group;
      // matterJsBody.collisionFilter.category = category;
      Composite.add(engine.current.world, body.getMatterJsBody());
    });
    
    worldConstraints.forEach((constraint) => {
      const matterJsConstraint = constraint.getMatterJsConstraint();
      const bodyA = matterJsConstraint.bodyA;
      const bodyB = matterJsConstraint.bodyB;
      bodyA.collisionFilter.mask = (bodyA.collisionFilter.mask & (~bodyB.collisionFilter.category)) >>> 0;
      bodyB.collisionFilter.mask = (bodyB.collisionFilter.mask & (~bodyA.collisionFilter.category)) >>> 0;
      Composite.add(engine.current.world, matterJsConstraint);
    });

    Runner.run(runner.current, engine.current)
    Render.run(render)

    return () => {
      Render.stop(render)
      Composite.clear(engine.current.world)
      Engine.clear(engine.current)
      render.canvas.remove()
      render.canvas = null
      render.context = null
      render.textures = {}
    }
  }, []);

  const playPause = () => {
    if (runner.current.enabled) {
      runner.current.enabled = false
      setPpIcon(faPlay);
    } else {
      runner.current.enabled = true
      setPpIcon(faPause);
    }
  }

  return (
    <div>
      <div className={Css.btnsDiv}>
        <button className={Css.stopBtn + " btn"} onClick={() => navigate("/editor")}>
          <FontAwesomeIcon icon={faStop} className={Css.stopBtnIcon} />
        </button>
        <button className={Css.pouseBtn + " btn"} onClick={playPause}>
          <FontAwesomeIcon icon={ppIcon} className={Css.pouseBtnIcon} />
        </button>
      </div>
      <div
        tabIndex="0"
        ref={scene}
        style={{height: "100vh", overflow: "hidden"}}
      ></div>
    </div>
  )
}