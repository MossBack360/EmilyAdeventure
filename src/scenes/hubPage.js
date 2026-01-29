class HubPage extends PIXI.Container {
    constructor(playerinfo) {
        super();
        //this.scene = null;
        //this.init();
        this.playerinfo=playerinfo;
        
    }
    async init(){
        const [backgroundT,monitorT,screenT,emilyWindowT] = await Promise.all([
            PIXI.Assets.load('/src/scenes/hubPage/background.png'),
            PIXI.Assets.load('/src/scenes/hubPage/monitor.png'),
            PIXI.Assets.load('/src/scenes/hubPage/screen.png'),
            PIXI.Assets.load('/src/scenes/hubPage/emilyWindow.png'),

        ]);
        let simpleDrag = new SimpleDrag();
        this.panel1 = new Panel("diary");
        await this.panel1.init();
        //this.panel1.position.set(1920/2,1080/2+600);
        //this.panel1.scale.set(0.9,0.9)
        this.background = new PIXI.Sprite(backgroundT);
        this.monitor = new PIXI.Sprite(monitorT);
        this.screen = new PIXI.Sprite(screenT);
        this.emilyWindow = new PIXI.Sprite(emilyWindowT);
        this.emilyWindow.x=1200

        const crt = new PIXI.filters.CRTFilter({
            curvature: 5,
            lineWidth: 5,
            lineContrast: 0.2,
            noise: 0.2,
            noiseSize: 1,
            vignetting: 0.4,
            vignettingAlpha: 1,
        });

        this.addChild(this.background);
        

        const shadow = new PIXI.Sprite(monitorT);
        shadow.tint = 0x000000;
        shadow.anchor.set(0.5,0.5)
        shadow.scale.set(1.5,1.5);
        shadow.alpha = 0.4;
        shadow.x += 470;
        shadow.y += 750;

        this.monitor.anchor.set(0.5,0.5);
        this.monitor.scale.set(1.5,1.5);
        this.monitor.position.set(460,700);

        this.screen.anchor.set(0.5,0.5);
        this.screen.scale.set(1.5,1.5);
        this.screen.position.set(460,700);


        //this.addChild(shadow);

        let btn1 = new Button({
            name: 'fun1',
            position: { x: -225, y: -265 },
        
            text: 'fun1',
            callback: () => {
            this.panel1.show();
        }
        });

        let btn2 = new Button({
        name: 'fun2',
        position: { x: -225, y: -210 },
        
        text: 'fun2',
        callback: () => {
        //dialog.show();
        }
        });
        btn1.scale.set(0.4,0.4);
        btn2.scale.set(0.4,0.4);

        this.background.addChild(this.screen);
        this.screen.addChild(btn1);
        this.screen.addChild(btn2);
        this.screen.addChild(this.monitor)
        
        this.screen.filters = [crt];


        this.addChild(this.monitor);

        this.playerinfo.app.ticker.add((delta) => {
            crt.time += delta * 0.3;
        });
        this.addChild(this.emilyWindow);
        this.addChild(this.panel1)
        
        simpleDrag.enableDrag(this.emilyWindow);



        

    }
}