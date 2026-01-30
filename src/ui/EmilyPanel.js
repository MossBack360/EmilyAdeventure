class EmilyPanel extends PIXI.Container {
  constructor(name) {
    super();
    this.name=name;
  }

  async init(){
    let simpleDrag = new SimpleDrag();

    const EmilyPanelT = await PIXI.Assets.load('/src/ui/EmilyPanel.png');
    const EmilyT = await PIXI.Assets.load('/src/ui/weirdEmily1.png');
    this.Emily = PIXI.Sprite.from(EmilyT);
    this.Emily.position.set(6,49);
    this.EmilyPanel = PIXI.Sprite.from(EmilyPanelT);
    this.EmilyPanel2 = PIXI.Sprite.from(EmilyPanelT);
    this.EmilyPanel.addChild(this.Emily);
    this.addChild(this.EmilyPanel);
    this.SCValue = "0"
    this.SC = new PIXI.Text("S.C: " + this.SCValue +" $", {
      fontFamily: 'NF Pixels',
      fill: 0x000000,
      fontSize: 100,
      //align: 'center'
    });
    this.SC.position.set(15,355)
    this.EmilyPanel.position.set(1420,560)
    this.EmilyPanel.addChild(this.SC)
    this.EmilyPanel.addChild(this.EmilyPanel2)
    simpleDrag.enableDrag(this.EmilyPanel);
  }
}