class FancyButton extends PIXI.Container {
  constructor({
    name,
    position = { x: 0, y: 0 },
    scale = { x: 1, y: 1 },
    text = '',
    callback = () => {},
    upSprite = "/src/ui/buttonOn.png",
    downSprite="/src/ui/buttonDown.png"
    
    //style = 'classic'
  }) {
    super();

    this.name = name;
    this.callback = callback;
    //this.style = style;
    this.isDown = false;
    this.upSprite = PIXI.Sprite.from(upSprite);
    this.downSprite=PIXI.Sprite.from(downSprite);

    this.position.set(position.x, position.y);
    this.scale.set(scale.x, scale.y);

    this._createVisuals(text);
    this._bindEvents();


  }

  _createVisuals(text) {
    

    this.downSprite.visible = false;

    // label（字体你以后可以随便换）
    this.label = new PIXI.Text(text, {
        fontFamily: 'NF Pixels',
        fill: 0x000000,
        fontSize: 60,
        align: 'center'
    });

    this.label.anchor.set(0.5);
    this.label.position.set(
      this.upSprite.width / 2,
      this.upSprite.height / 2
    );
    this.label.x = 141
    this.label.y = 60
    this.addChild(this.upSprite);
    this.addChild(this.downSprite);
    this.addChild(this.label);

    // 交互
    this.eventMode = 'static';
    this.cursor = 'pointer';
  }

  _bindEvents() {
    this.on('pointerdown', () => {
      this.isDown = true;
      this._setDownState();
    });

    this.on('pointerup', () => {
      if (!this.isDown) return;
      this.isDown = false;
      this._setUpState();
      this.callback();
    });

    this.on('pointerupoutside', () => {
      this.isDown = false;
      this._setUpState();
    });
  }

  _setDownState() {
    this.upSprite.visible = false;
    this.downSprite.visible = true;

    // 文字右下偏移（你说的 4px）
    this.label.x += 4;
    this.label.y += 4;
  }

  _setUpState() {
    this.upSprite.visible = true;
    this.downSprite.visible = false;

    this.label.x -= 4;
    this.label.y -= 4;
  }
}
