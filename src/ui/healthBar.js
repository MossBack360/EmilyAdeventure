class HealthBar extends PIXI.Container{
  
  constructor(PlayerInfo) {
    super();
    this.position.set=(0,0);
    this.playerInfo = PlayerInfo; 
    this.app = PlayerInfo.app;
    this.health = PlayerInfo.health;
    //this.init();
  }

  async init() {
    if (this.playerInfo.HUDDisable) {
      return;
    }
    else {
    const [
      barTex,
      beadsTex,
      beadsMaskTex
    ] = await Promise.all([
      PIXI.Assets.load('/src/ui/bar.png'),
      PIXI.Assets.load('/src/ui/beads.png'),
      PIXI.Assets.load('/src/ui/beadsM.png'),
    ]);
    
    this.bar = PIXI.Sprite.from(barTex);
    this.bar.x = this.position.x;
    this.bar.y = this.position.y;

    this.beads = PIXI.Sprite.from(beadsTex);
    this.beads.anchor.set(0.5,0.5)
    this.beads.x = 22;
    this.beads.y = 110;
    
    this.beadsMask = PIXI.Sprite.from(beadsMaskTex);
    this.beadsMask.anchor.set(0.5,0.5)
    this.beadsMask.x = 0;
    this.beadsMask.y = 110;
    const ratio = 100 - this.playerInfo.health;
    const hpUI = new PIXI.Container();

    this.addChild(this.bar);
    this.addChild(this.beads);

    this.beadsMask.y = this.position.y + (183 * (ratio/100));
    this.beads.addChild(this.beadsMask);

    this.beads.mask = this.beadsMask;

    this.addChild(hpUI);
    }
  }

}
