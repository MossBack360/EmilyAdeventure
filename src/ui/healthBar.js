class HealthBar {
  
  constructor(PositionXY, PlayerInfo) {
    this.position = PositionXY;
    this.playerInfo = PlayerInfo; 
    this.app = PlayerInfo.app;
    this.health = PlayerInfo.health;

    this.bar = PIXI.Sprite.from('/src/ui/bar.png');
    this.bar.anchor.set(0.5);
    this.bar.x = this.position.x;
    this.bar.y = this.position.y;

    this.beads = PIXI.Sprite.from('/src/ui/beads.png');
    this.beads.anchor.set(0.5);
    this.beads.x = this.position.x;
    this.beads.y = this.position.y;
    
    this.beadsMask = PIXI.Sprite.from('/src/ui/beadsM.png');
    this.beadsMask.anchor.set(0.5);
    this.beadsMask.x = this.position.x;
    this.beadsMask.y = this.position.y;
  }

  show() {
    if (!this.playerInfo.HUDDisable) return;
    const ratio = 100 - this.playerInfo.health;
    const hpUI = new PIXI.Container();

    hpUI.addChild(this.bar);
    hpUI.addChild(this.beads);

    this.beadsMask.y = this.position.y + (183 * (ratio/100));
    hpUI.addChild(this.beadsMask);

    this.beads.mask = this.beadsMask;

    this.app.stage.addChild(hpUI);
  }

}
