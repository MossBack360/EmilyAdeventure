class DialogBox extends PIXI.Container {
    constructor(
        text,
        avatar = '/src/ui/dummyAvatar.png',
        dialogBody = '/src/scenes/startPage/notepad.png',
        buttons=[]
    ) {
        super();

        this.fullText = text;
        this.avatarPath = avatar;
        this.dialogBodyPath = dialogBody;

        this.textIndex = 0;
        this.typing = false;
        this.timer = null;
    }

    async init() {
        const [avatarT, dialogBodyT] = await Promise.all([
            PIXI.Assets.load(this.avatarPath),
            PIXI.Assets.load(this.dialogBodyPath),
        ]);

        // 对话框背景
        this.body = new PIXI.Sprite(dialogBodyT);
        this.body.anchor.set(0.5, 1);
        this.body.position.y = 500
        this.addChild(this.body);

        // 头像
        this.avatar = new PIXI.Sprite(avatarT);
        this.avatar.anchor.set(0.5, 0.5);
        this.avatar.x = -this.body.width / 2 +50 ;
        this.avatar.y = -800+100;
        this.avatar.scale.set(1,1);
        this.body.addChild(this.avatar);

        this.NextBtn = new Button({
            name: 'Next',
            position: { x: 0, y: 0 },  
            text: 'Next',
            callback: () => {
            this.leave();
            }
        });
        this.NextBtn.x = -this.body.width / 2 + 820 ;
        this.NextBtn.y = -800+230;
        this.NextBtn.scale.set(0.5,0.5);

        

        // 文本
        this.text = new PIXI.Text('', {
            fontFamily: 'NF Pixels',
            fontSize: 40,
            fill: 0x333333,
            wordWrap: true,
            wordWrapWidth: this.body.width - 140,
        });

        this.text.x = -this.body.width / 2 + 150;
        this.text.y = -this.body.height +100;
        this.body.addChild(this.text);

        // 交互
        this.interactive = true;
        this.on('pointerdown', () => {
            if (this.typing) {
                this.finishTyping();
            }
        });

        this.body.addChild(this.NextBtn);
        this.visible = false;
    }

    /* ================= 打字机 ================= */

    startTyping() {
        this.text.text = '';
        this.textIndex = 0;
        this.typing = true;

        this.timer = setInterval(() => {
            this.text.text += this.fullText[this.textIndex];
            this.playTypeSound();
            this.textIndex++;

            if (this.textIndex >= this.fullText.length) {
                this.finishTyping();
            }
        }, 40);
    }

    finishTyping() {
        //clearInterval(this.timer);
        clearInterval(this.timer);
        this.text.text = this.fullText;
        this.typing = false;
    }

    playTypeSound() {
        if (Math.random() < 0.4) return;
        PIXI.sound?.play('type', { volume: 0.3 });
    }

    /* ================= 动画 ================= */

    // 从底部弹出
    show() {
        this.visible = true;
        this.y += 100;
        this.alpha = 0;

        gsap.to(this, {
            y: this.y - 100,
            alpha: 1,
            duration: 0.35,
            ease: 'back.out(1.7)',
            onComplete: () => this.startTyping(),
        });
    }

    // 闪一下消失
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
