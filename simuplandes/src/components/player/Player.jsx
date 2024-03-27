import { useEffect, useRef } from 'react'
import { Engine, Render, Bodies, World, Runner } from 'matter-js'

export default function Player (props) {
  const scene = useRef();
  const engine = useRef(Engine.create());
  const runner = useRef(Runner.create());

  useEffect(() => {
    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent'
      }

    })
    
    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true })
    ]);

    props.worldBodies.forEach((body) => {
        World.add(engine.current.world, body.getMatterJsBody());
    });

    Runner.run(runner.current, engine.current)
    runner.current.enabled = false
    Render.run(render)

    return () => {
      Render.stop(render)
      World.clear(engine.current.world)
      Engine.clear(engine.current)
      render.canvas.remove()
      render.canvas = null
      render.context = null
      render.textures = {}
    }
  }, [])

  const handleDown = (e) => {
    // isPressed.current = true
    // const ball = Bodies.circle(
    // e.clientX,
    // e.clientY,
    // 10 + Math.random() * 30,
    // {
    //   mass: 10,
    //   restitution: 0.9,
    //   friction: 0.005,
    //   render: {
    //     fillStyle: '#0000ff'
    //   }
    // })
    // World.add(engine.current.world, [ball])
    // setTimeout(() => {
    //   Body.scale(ball, 10, 10)
    // }, 1000)
  }

  const handlePress = (e) => {
    if(e.key === "p") {
      if (runner.current.enabled) {
        runner.current.enabled = false
      } else {
        runner.current.enabled = true
      }
    }
  }

  return (
    <div
      onMouseDown={handleDown}
      onKeyDown={handlePress}
      tabIndex="0"
      ref={scene}
      style={{height: "100vh", overflow: "hidden"}}
    >

    </div>
  )
}