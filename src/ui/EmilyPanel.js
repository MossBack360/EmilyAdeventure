class EmilyPanel extends PIXI.Container {
  constructor(name,playerinfo) {
    super();
    this.name=name;
    this.playerinfo=playerinfo;
  }

  async init(){
    let simpleDrag = new SimpleDrag();

    const EmilyPanelT = await PIXI.Assets.load('/src/ui/EmilyPanel.png');
    const EmilyT = await PIXI.Assets.load('/src/ui/weirdEmily1.png');
    const glitch = new PIXI.filters.GlitchFilter();
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

    glitch.slices=4;
    this.Emily.filters=[glitch];
    simpleDrag.enableDrag(this.EmilyPanel);

    glitch.slices=2.5
    let t=0
    this.playerinfo.app.ticker.add((delta) => {

      t += delta * 0.03;
      glitch.slices = Math.floor((Math.sin(t) + 1) * 5);
      }
    )
  }
}