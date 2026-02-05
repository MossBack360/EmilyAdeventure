class Physics {
    constructor(pixiApp) {
        const { Engine, World, Bodies, Body, Svg } = Matter;

        this.Engine = Engine;
        this.World = World;
        this.Bodies = Bodies;
        this.Body = Body;
        this.Svg = Svg;

        this.engine = Engine.create();
        this.world = this.engine.world;

        this.render = Matter.Render.create({
            element: document.getElementById('matterJSDebug'), // 绑定页面元素
            engine: this.engine, // 绑定引擎
            
            options:{
                width: 1920,
                height: 1080,
            }
        });

        this.app = pixiApp;
        //this.engine.world.gravity.x = 0;
        //this.engine.world.gravity.y = 1;
        //this.engine.world.gravity.scale = 0.01;
        

        this.bodies = new Map();    // name -> body
        this.bindings = new Map();  // body -> pixiObj
    }

    /* -----------------------------
     * Main update (call in ticker)
     * ----------------------------- */
    update() {
        this.Engine.update(this.engine);

        for (const [body, pixi] of this.bindings) {
            pixi.position.set(body.position.x, body.position.y);
            pixi.rotation = body.angle;
        }
    }

    /* -----------------------------
     * Add dynamic body
     * ----------------------------- */
    add(name, body) {
        this.World.add(this.world, body);
        this.bodies.set(name, body);
        return body;
    }

    /* -----------------------------
     * Add static body
     * ----------------------------- */
    addStatic(name, body) {
        body.isStatic = true;
        this.World.add(this.engine.world, body);
        this.bodies.set(name, body);
        return body;
    }

    /* -----------------------------
     * Remove body
     * ----------------------------- */
    remove(name) {
        const body = this.bodies.get(name);
        if (!body) return;

        this.World.remove(this.engine.world, body);
        this.bodies.delete(name);
        this.bindings.delete(body);
    }

    /* ------------------------------------------------
     * JSON -> Bodies (multiple, top-left coords, clamp < 0 to 0)
     * ------------------------------------------------ */
    async addBodyFromJSON(url) {
        const jsonText = await fetch(url).then(r => r.text());
        const J = JSON.parse(jsonText);
        const bodies = [];
        const objs = J.shapes || {};

        for (const shape in objs) {
            //const shape = item.shape;
            //if (!shape || !shape.fixtures || !shape.fixtures.length) continue;

            const name = shape.label;
            const isStatic = (shape.bodyType || "").toUpperCase() === "STATIC";

            const parts = (shape.fixtures || [])
                .filter(f => f.shapeType === "RECTANGLE" && f.rectangle)
                .map(f => {
                    const rect = f.rectangle;

                    // 允许负坐标：不要 clamp
                    const x = Number(rect.x) || 0;
                    const y = Number(rect.y) || 0;
                    const w = Number(rect.w) || 0;
                    const h = Number(rect.h) || 0;

                    // Bodies.rectangle 的 x/y 是中心点
                    const centerX = x + w / 2;
                    const centerY = y + h / 2;

                    // 你的约定：rotation=1 表示 1π（半圈）
                    const angle = (Number(f.rotation) || 0) * Math.PI;

                    // chamfer：先只支持单值半径
                    if (f.chamfer != null) {
                        const r = Number(f.chamfer);
                        if (Number.isFinite(r) && r > 0) {
                            options.chamfer = { radius: r };
                        }
                    }
                    //task1: 这里有问题，每个part都push进去，然后const compound = Body.create({parts: [partA, partB, partC]});
                    return this.Bodies.rectangle(centerX, centerY, w, h, options);
                });

            //if (!parts.length) continue;


            const body = this.Body.create({
                parts,
                isStatic,
                label: name
            });

            this.World.add(this.engine.world, body);
            this.bodies.set(name, body);
            bodies.push(body);
        }

        return bodies;
    }

    /* -----------------------------
     * Bind pixi object to body
     * ----------------------------- */
    bind(bodyName, pixiObj) {
        const body = this.bodies.get(bodyName);
        if (!body) return;

        if (pixiObj.anchor) {
            pixiObj.anchor.set(0.5);
        } else {
            pixiObj.pivot.set(
                pixiObj.width / 2,
                pixiObj.height / 2
            );
        }

        this.bindings.set(body, pixiObj);
    }

    run() {
        Matter.Runner.run(this.engine);
    }
    debugRun() {
        this.run();
        Matter.Render.run(this.render);
    }
}
