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

        let deco1 = PIXI.Sprite.from('/src/scenes/startPage/deco.png');
        
        let deco2 = PIXI.Sprite.from('/src/scenes/startPage/deco.png');
        let deco3 = PIXI.Sprite.from('/src/scenes/startPage/deco.png');
        let deco4 = PIXI.Sprite.from('/src/scenes/startPage/deco.png');
        let deco5 = PIXI.Sprite.from('/src/scenes/startPage/deco.png');
        deco1.eventMode = 'static';
        deco2.eventMode = 'static';
        deco3.eventMode = 'static';
        deco4.eventMode = 'static'
        deco5.eventMode = 'static'

        deco1.anchor.set(0.5,0.5);
        deco1.x=137;
        deco1.y=1137;
        deco1.ox=137;
        deco1.oy=1137;
        deco1.rotation = Math.PI/17;

        deco2.anchor.set(0.5,0.5);
        deco2.x=47;
        deco2.y=1137;
        deco2.ox=47;
        deco2.oy=1137;
        deco2.rotation = Math.PI/17;

        deco3.anchor.set(0.5,0.5);
        deco3.x=-27;
        deco3.y=1137;
        deco3.ox=-27;
        deco3.oy=1137;
        deco3.rotation = Math.PI/17;

        deco4.anchor.set(0.5,0.5);
        deco4.x=-102;
        deco4.y=1137;
        deco4.ox=-102;
        deco4.oy=1137;
        deco4.rotation = Math.PI/17;

        deco5.anchor.set(0.5,0.5);
        deco5.x=-179;
        deco5.y=1137;
        deco5.ox=-179;
        deco5.oy=1137;
        deco5.rotation = Math.PI/17;

        deco1.on('pointerover', () => {
            if(notepad.finishAnimation){this._goto(deco1,[50,0])}
            
        });
        deco1.on('pointerout', () => {
            if(notepad.finishAnimation){this._goback(deco1)}
        });
        //
        
        deco2.on('pointerover', () => {
            if(notepad.finishAnimation){this._goto(deco2,[40,0])}
            
        });
        deco2.on('pointerout', () => {
            if(notepad.finishAnimation){this._goback(deco2)}
        });

        deco3.on('pointerover', () => {
            if(notepad.finishAnimation){this._goto(deco3,[30,0])}
            
        });
        deco3.on('pointerout', () => {
            if(notepad.finishAnimation){this._goback(deco3)}
        });

        deco4.on('pointerover', () => {
            if(notepad.finishAnimation){this._goto(deco4,[20,0])}
            
        });
        deco4.on('pointerout', () => {
            if(notepad.finishAnimation){this._goback(deco4)}
        });

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

        const startBtn = new FancyButton({
            name: 'Start',
            position: { x: 100, y: 0 },
            callback: () => {
                this._shrink(msk);
            },
            upSprite: "asset/startOn.png",
            downSprite: "asset/startDown.png"
        
        });
        startBtn.upSprite.anchor.set(0.5);
        startBtn.downSprite.anchor.set(0.5);
        startBtn.x = 960;
        startBtn.y = 949;
        startBtn.ox = 960;
        startBtn.oy = 949;
        //brick.scale.set(0.8,0.8);
        startBtn.eventMode = 'static'
        startBtn.on('pointerover', () => {
            if(notepad.finishAnimation){this._goto(startBtn,[0,30])}
            
        });
        startBtn.on('pointerout', () => {
            if(notepad.finishAnimation){this._goback(startBtn)}
        });
        let msk = PIXI.Sprite.from('/src/scenes/startPage/msk.png');
        msk.anchor.set(0.5,0.5)
        msk.position.x = 1920/2
        msk.position.y = 1080/2
        msk.scale.set(8, 8);

        this.app.stage.addChild(background0);
        background0.addChild(deco5)
        background0.addChild(deco4)
        background0.addChild(deco3)
        background0.addChild(deco2)
        background0.addChild(deco1)
        background0.addChild(notepad);
        background0.addChild(startBtn);
        background0.addChild(logo);
        background0.addChild(msk);
        background0.mask = msk
        
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

    _shrink(obj){
        gsap.to(obj.scale, { x:0 , y:0, duration: 0.3, ease: "back.out(2)",
            onComplete: () => {
            obj.finishAnimation = true;}
         });
    }
}