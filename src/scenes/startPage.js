class StartPage {
    constructor(playerInfo) {
        this.playerInfo = playerInfo;
        this.app = playerInfo.app;
        //this.scene = null;
    }

    init() {
        // Initialize the start page scene
    }

    show() {
        let background0 = PIXI.Sprite.from('/src/scenes/startPage/background0.png');
        background0.anchor.set(0,0);
        background0.x = 0;
        background0.y = 0;
        background0.scale.set(1,1);

        let notepad = PIXI.Sprite.from('/src/scenes/startPage/notepad.png');
        notepad.anchor.set(0.5);
        notepad.x = 960;
        notepad.y = 781;

        notepad.ox = 960; //original
        notepad.oy = 781;
        notepad.finishAnimation = true

        notepad.scale.set(0.5,0.5);
        notepad.scale.set(1,1);
        notepad.rotation = Math.PI/-20;
        notepad.eventMode = 'static'
        notepad.on('pointerover', () => {
            if(notepad.finishAnimation){this._goto(notepad)}
            
        });
        notepad.on('pointerout', () => {
            if(notepad.finishAnimation){this._goback(notepad)}
        });

        let logo = PIXI.Sprite.from('/src/scenes/startPage/logo.png');
        logo.anchor.set(0.5);
        logo.x = 960;
        logo.y = 656;
        logo.scale.set(0.8,0.8);

        let brick = PIXI.Sprite.from('/src/scenes/startPage/brick.png');
        brick.anchor.set(0.5);
        brick.x = 960;
        brick.y = 949;
        brick.ox = 960;
        brick.oy = 949;
        //brick.scale.set(0.8,0.8);
        brick.eventMode = 'static'
        brick.on('pointerover', () => {
            if(notepad.finishAnimation){this._goto(brick,[0,30])}
            
        });
        brick.on('pointerout', () => {
            if(notepad.finishAnimation){this._goback(brick)}
        });

        this.app.stage.addChild(background0);
        this.app.stage.addChild(notepad);
        this.app.stage.addChild(brick);
        this.app.stage.addChild(logo);
        
    }

    hide() {
        // Hide the start page
    }

    _goto(obj,offset = [0,50]){
        gsap.to(obj.position, { x:obj.ox + offset[0]  , y: obj.oy + offset[1], duration: 0.3, ease: "back.out(2)",
            onComplete: () => {
            obj.finishAnimation = true;}
        });

    }

    _goback(obj){
        gsap.to(obj.position, { x:obj.ox  , y: obj.oy, duration: 0.3, ease: "back.out(2)",
            onComplete: () => {
            obj.finishAnimation = true;}
         });
    }
}