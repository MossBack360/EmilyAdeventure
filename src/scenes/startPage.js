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
        notepad.scale.set(0.5,0.5);
        notepad.scale.set(1,1);
        notepad.rotation = Math.PI/-20;

        let logo = PIXI.Sprite.from('/src/scenes/startPage/logo.png');
        logo.anchor.set(0.5);
        logo.x = 960;
        logo.y = 656;
        logo.scale.set(0.8,0.8);
        this.app.stage.addChild(background0);
        this.app.stage.addChild(notepad);
        this.app.stage.addChild(logo);
    }

    hide() {
        // Hide the start page
    }
}