class Panel extends PIXI.Container {
  constructor(name,buttons=[]) {
    super();
    this.name=name;
    this.buttons=buttons
  }
  async init(){
    const [panelT] = await Promise.all([
      PIXI.Assets.load('/src/ui/panel2.png'),
    ]);

    this.exitBtn = new Button({
      name: 'exit',
      position: { x: 260, y: -527 },  
      text: 'Exit',
      callback: () => {
      this.leave();
      }
    });
    this.exitBtn.scale.set(0.3,0.3)

    this.panel = PIXI.Sprite.from(panelT);
    this.panel.anchor.set(0.5,0.5);
    this.addChild(this.panel);
    this.panel.position.set(1920/2,1080/2+100);
    this.panel.addChild(this.exitBtn)
    this.visible=false
  }

  show() {
    this.visible = true;
    this.y += 100;
    this.alpha = 0;

    gsap.to(this, {
      y: this.y - 100,
      alpha: 1,
      duration: 0.35,
      ease: 'back.out(1.7)',
      //onComplete: () => this.startTyping(),
    });
    }

  leave() {
    gsap.to(this, {
      alpha: 0,
      duration: 0.15,
      //yoyo: true,
      //repeat: 1,
      onComplete: () => {
      this.visible = false;
      },
    });
  }
}
