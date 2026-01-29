class SimpleDrag{
    constructor() {
        
    }

    enableDrag(
      target,
      {
        screenWidth = 1920,
        screenHeight = 1080,
        padding = 10,
      } = {}
    ) {
        target.eventMode = 'static';
        target.cursor = 'pointer';

        let dragging = false;
        let startPointerPos = null;
        let startObjPos = null;

        target.on('pointerdown', (e) => {
            dragging = true;

            startPointerPos = e.data.global.clone();
            startObjPos = {
            x: target.x,
            y: target.y,
            };

            target.alpha = 0.9;
        });

        target.on('pointerup', endDrag);
        target.on('pointerupoutside', endDrag);

        target.on('pointermove', (e) => {
            if (!dragging) return;

            const currentPointerPos = e.data.global;

            const dx = currentPointerPos.x - startPointerPos.x;
            const dy = currentPointerPos.y - startPointerPos.y;

            let nextX = startObjPos.x + dx;
            let nextY = startObjPos.y + dy;

            // === 边界限制（pivot = 0,0）===
            const maxX = screenWidth - target.width - padding;
            const maxY = screenHeight - target.height - padding;

            nextX = Math.min(Math.max(nextX, padding), maxX);
            nextY = Math.min(Math.max(nextY, padding), maxY);

            target.x = nextX;
            target.y = nextY;
        });

        function endDrag() {
            dragging = false;
            target.alpha = 1;
            }
    }
}