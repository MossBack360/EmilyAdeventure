class Hoven{
    constructor(obj){
        this.obj = obj;
        //this.finishAnimation=true
    }


    addAnimation(){
        
        this.obj.eventMode = 'dynamic';
        this.obj.on('pointerover', () => {
            this.ox = this.obj.scale.x;
            this.oy = this.obj.scale.y;

            gsap.to(obj.scale, { x:this.ox*1.2  , y: this.oy*1.2, duration: 0.3, ease: "back.out(2)"});       

        }
        
        );

        this.obj.on('pointerout', () => {

            gsap.to(obj.scale, { x:this.ox  , y: this.oy, duration: 0.3, ease: "back.out(2)"}); 
            });   

    }

}