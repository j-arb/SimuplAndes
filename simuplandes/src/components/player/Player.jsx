import { useEffect, useRef } from 'react'
import { Engine, Render, Bodies, Runner, Composite } from 'matter-js'
import { useNavigate } from 'react-router';

export default function Player (props) {
  const scene = useRef();
  const navigate = useNavigate();
  const engine = useRef(Engine.create());
  const runner = useRef(Runner.create());
  
  useEffect(() => {
    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;

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

    if (props.worldBodies.length > 32) {
      alert("There are more than 32 bodies. Collisions will not be detected");
    }

    props.worldBodies.forEach((body) => {
      body.resetMatterJsBody();
      const matterJsBody = body.getMatterJsBody();
      const group = (props.worldBodies.length <= 32) ? 0 : -1;
      const category = (props.worldBodies.length <= 32) ? Math.pow(2, body.id) : 1;
      matterJsBody.collisionFilter.group = group;
      matterJsBody.collisionFilter.category = category;
      Composite.add(engine.current.world, body.getMatterJsBody());
    });
    
    Object.values(props.worldConstraints).forEach((constraint) => {
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
  });

  const handlePress = (e) => {
    if(e.key === "p") {
      if (runner.current.enabled) {
        runner.current.enabled = false
      } else {
        runner.current.enabled = true
      }
    }

    if(e.key === "e") {
      navigate("/editor")
    }
  }

  return (
    <div
      onKeyDown={handlePress}
      tabIndex="0"
      ref={scene}
      style={{height: "100vh", overflow: "hidden"}}
    >

    </div>
  )
}