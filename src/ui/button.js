class Button{
    constructor(name, positionXY, callback, style){
        this.name = name;
        this.positionXY = positionXY;
        this.callback = callback;
        this.style = style;
    }
    show(){
        buttonOn = PIXI.Sprite.from('/src/ui/buttonOn.png')
        buttonDown = PIXI.Sprite.from('/src/ui/buttonDown.png')
    }
    
}