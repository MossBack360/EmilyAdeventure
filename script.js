const app = new PIXI.Application({
    width: 1920,
    height: 1080, 
    backgroundColor: 0x00ff00, 
});

displayArea = document.getElementById('displayArea');
displayArea.appendChild(app.view);




let itemBarXY = { x: 180, y: 580 };
let plateXY = { x: 1126, y: 574 };
let medicalShelfXY = { x: 1614, y: 1000 };

function animateItemBarIn(){
    gsap.to(itemBar.position, { x: itemBarXY.x, y: itemBarXY.y, duration: 0.3, ease: "back.out(2)" });
}

function animateMedicalShelfIn(){
    gsap.to(medicalShelf.position, { x: medicalShelfXY.x, y: medicalShelfXY.y, duration: 0.5, ease: "back.out(2)" });
}

function animatePlateIn(){
    gsap.to(plate.position, { x: plateXY.x, y: plateXY.y, duration: 0.8, ease: "power4" });
}

function punchScale(
  obj,
  {
    scale = 1.1,
    duration = 0.2,
  } = {}
) {
  return gsap.fromTo(
    obj.scale,
    { x: 1, y: 1 },
    {
      x: scale,
      y: scale,
      duration: duration / 2,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    }
  );
}

const windowGlass = PIXI.Sprite.from('./media/pic/windowGlass.png');
windowGlass.anchor.set(0.5);
windowGlass.x = 846;
windowGlass.y = 60;
app.stage.addChild(windowGlass);

const plate = PIXI.Sprite.from('./media/pic/plate.png');
plate.anchor.set(0.5);
plate.x = -818;
plate.y = 574;
app.stage.addChild(plate);

const itemBar = PIXI.Sprite.from('./media/pic/itemsBar.png');
itemBar.anchor.set(0.5);
itemBar.x = -146;
itemBar.y = 580;
app.stage.addChild(itemBar);

const medicalShelf = PIXI.Sprite.from('./media/pic/medicalShelf.png');
medicalShelf.anchor.set(0.5);
medicalShelf.x = 1614;
medicalShelf.y = 1130;
app.stage.addChild(medicalShelf);

const obj1 = PIXI.Sprite.from('./media/pic/items/obj1.png');
obj1.anchor.set(0.5);
obj1.x = 180;
obj1.y = 320;
obj1.eventMode = 'static';
obj1.cursor = 'pointer';
app.stage.addChild(obj1);
obj1.on('pointerdown', () => {
  punchScale(obj1);
});


const obj2 = PIXI.Sprite.from('./media/pic/items/obj2.png');
obj2.anchor.set(0.5);
obj2.x = 180;
obj2.y = 480;
obj2.eventMode = 'static';
obj2.cursor = 'pointer';
app.stage.addChild(obj2);
obj2.on('pointerdown', () => {
  punchScale(obj2);
});



const obj3 = PIXI.Sprite.from('./media/pic/items/obj3.png')
obj3.anchor.set(0.5);
obj3.x = 180;
obj3.y = 640;
obj3.eventMode = 'static';
obj3.cursor = 'pointer';
app.stage.addChild(obj3);
obj3.on('pointerdown', () => {
  punchScale(obj3);
});


animateItemBarIn();
animateMedicalShelfIn();
animatePlateIn();

function makeDraggable(sprite, targetArea) {
    let originalPosition = { x: sprite.x, y: sprite.y };

    sprite.interactive = true;
    sprite.buttonMode = true;

    sprite.on('pointerdown', onDragStart);
    sprite.on('pointerup', onDragEnd);
    sprite.on('pointerupoutside', onDragEnd);
    sprite.on('pointermove', onDragMove);

    function onDragStart(event) {
        sprite.data = event.data;
        sprite.alpha = 0.5; // 透明度变化
        sprite.dragging = true;
    }

    function onDragEnd() {
        sprite.alpha = 1;
        sprite.dragging = false;
        sprite.data = null;

        // 检查是否在目标区域内
        if (isInTargetArea(sprite, targetArea)) {
            // 固定到新位置
            sprite.x = sprite.x;
            sprite.y = sprite.y;
        } else {
            // 回到原来的位置
            sprite.x = originalPosition.x;
            sprite.y = originalPosition.y;
        }
    }

    function onDragMove() {
        if (sprite.dragging) {
            const newPosition = sprite.data.getLocalPosition(sprite.parent);
            sprite.x = newPosition.x;
            sprite.y = newPosition.y;
        }
    }

    function isInTargetArea(sprite, targetArea) {
        return (sprite.x >= targetArea[0] && sprite.x <= targetArea[2] &&
                sprite.y >= targetArea[1] && sprite.y <= targetArea[3]);
    }
}

makeDraggable(obj1, [1126, 574, 1126 + plate.width, 574 + plate.height]);
makeDraggable(obj2, [1126, 574, 1126 + plate.width, 574 + plate.height]);
makeDraggable(obj3, [1126, 574, 1126 + plate.width, 574 + plate.height]);


