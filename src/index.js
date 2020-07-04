import { 
    Engine,
    World,
    Bodies,
    Constraint, 
    Render,
    Mouse,
    MouseConstraint,
    Events,
    Vector,
    } from 'matter-js'





document.body.style.margin = 0
document.body.style.padding = 0

// create an engine
let engine = Engine.create(),
    world = engine.world,
// create a renderer
    render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 1000,
            height: 600,
            background: '#000',
            // showBroadphase: true,
            // showAxes: true,
            // showCollisions: true,
            // showConvexHulls: true,
            showVelocity: true,
            wireframes: false // <-- important
        }
})

const ballOptoins = { render: {
    sprite: {
        texture: 'https://answers.unity.com/storage/temp/74016-0001.png',
        xScale: .9,
        yScale: .9,
    }
}, density: 0.5, frictionAir: 0.001, slop: 0.5, friction: 1, restitution: 1.05,}

var ball = Bodies.circle(200, 380, 50, ballOptoins);
World.add(world, ball);
World.add(world, Constraint.create({
pointA: { x: 300, y: 100 },
bodyB: ball
}));

var ball2 = Bodies.circle(400, 400, 50, ballOptoins);
World.add(world, ball2);
World.add(world, Constraint.create({
pointA: { x: 400, y: 100 },
bodyB: ball2
}));

var ball3 = Bodies.circle(500, 400, 50, ballOptoins);
World.add(world, ball3);
World.add(world, Constraint.create({
pointA: { x: 500, y: 100 },
bodyB: ball3
}));

var ball4 = Bodies.circle(600, 400, 50, ballOptoins);
World.add(world, ball4);
World.add(world, Constraint.create({
pointA: { x: 600, y: 100 },
bodyB: ball4
}));

var ball5 = Bodies.circle(700, 400, 50, ballOptoins);
World.add(world, ball5);
World.add(world, Constraint.create({
pointA: { x: 700, y: 100 },
bodyB: ball5
}));

var platform = Bodies.rectangle(500, 100, 410, 30, {
    render: {
        fillStyle: '#fff',
    },
    chamfer: 10,
    isStatic: true,
})
World.add(world, platform);
const trackLine = body => {
    let trail = [];
    Events.on(render, 'afterRender', function() {
        trail.unshift({
            position: Vector.clone(body.position),
            speed: body.speed
        });

        Render.startViewTransform(render);
        render.context.globalAlpha = 0.7;

        for (var i = 0; i < trail.length; i += 1) {
            var point = trail[i].position,
                speed = trail[i].speed;
            
            var hue = 250 + Math.round((1 - Math.min(1, speed / 10)) * 170);
            render.context.fillStyle = '#fff';
            render.context.fillRect(point.x, point.y, 2, 2);
        }

        render.context.globalAlpha = 1;
        Render.endViewTransform(render);

        if (trail.length > 100) {
            trail.pop();
        }
    });
}

trackLine(ball)
trackLine(ball2)
trackLine(ball3)
trackLine(ball4)
trackLine(ball5)


// add mouse control
let mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// run the engine
Engine.run(engine)

// run the renderer
Render.run(render)


