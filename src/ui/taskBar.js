class TaskBar extends PIXI.Container {
  constructor(name,buttons=[]) {
    super();
    this.name=name;
    this.buttons=buttons;
  }

  async init(){
    const [
        taskBarT,separatorT,EmilyEyeT
    ] = await Promise.all([
        PIXI.Assets.load('/src/ui/taskBar.png'),
        PIXI.Assets.load('/src/ui/separator.png'),
        PIXI.Assets.load('/src/ui/EmilyEye.png')
    ]);
    this.separator = PIXI.Sprite.from(separatorT);
    this.taskBar = PIXI.Sprite.from(taskBarT);
    this.EmilyEye = PIXI.Sprite.from(EmilyEyeT);

    this.taskBar.anchor.set(0,1);
    //this.taskBar.scale.set(3,0.5);
    this.taskBar.position.set(0,1100);

    

    this.startBtn = new FancyButton({
        name: 'Start',
        position: { x: 5, y: 1030 },
        callback: () => {
          this.StartMenuShow();
        },
        upSprite: "src/ui/winStartUp.png",
        downSprite: "src/ui/winStartDown.png"
        });

    this.menuShow=false
    this.startBtn.scale.set(0.4,0.4);

    this.winMenu = new Panel("winMenu",undefined,"src/ui/windowMenuPanel.png");
    await this.winMenu.init();
    //this.winMenu.scale.set(0.7,0.7);
    //this.winMenu.panel.anchor.set(1,1);
    this.winMenu.panel.anchor.set(0,1);
    this.winMenu.position.set(-969,400);
    this.winMenu.exitBtn.visible=false
    
    this.timeInfo="Day: XX, Time: AM"
    this.time = new PIXI.Text(this.timeInfo, {
      fontFamily: 'NF Pixels',
      fill: 0x000000,
      fontSize: 60,
      //align: 'center'
    });
    this.time.anchor.set(1,1);
    this.time.position.set(1910,-30)
    this.time.scale.set(0.5,0.5);
    //this.winMenu.scale.set(1,1);
    this.addChild(this.winMenu);
    this.addChild(this.taskBar);

    this.time.addChild(this.separator)
    this.separator.scale.set(2,2)
    this.taskBar.addChild(this.time);
    this.separator.position.set(-2*this.time.width -50, -80);

    this.EmilyEye.anchor.set(1,0);
    this.EmilyEye.position.set(-5,5);
    this.separator.addChild(this.EmilyEye);

    
    this.addChild(this.startBtn);

  }

  StartMenuShow(){
    if(this.menuShow){
      this.winMenu.leave();
      this.menuShow=false;
    }
    else{
      this.winMenu.show();
      this.menuShow=true;
    }
  }

}