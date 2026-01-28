async function main()
{
    PIXI.Assets.addBundle('fonts1', {
        nfpixels: '/fonts/NFPixels-Regular.ttf'
    });

    await PIXI.Assets.loadBundle('fonts1');

    //const { deprecation } = require("pixi.js");


    const app = new PIXI.Application({
        width: 1920,
        height: 1080, 
        backgroundColor: 0x00ff00, 
        });
        displayArea = document.getElementById('displayArea');
        displayArea.appendChild(app.view);

    let playerInfo = {
        health: 100,
        app: app,
        HUDDisable: false,
        Depression: 0,
        Anxiety: 0,
        Stress: 3,
        Confusion: 10,
        Hallucination: 0,
        alive : true,

        whichDialogBox:null
        


    }

    const win = new Window({
  title: "Hello World",
  width: 300,
  height: 200,
  x: 100,
  y: 100,
  resizable: true,
  maximizable: true,
  minimizable: true,
});

win.content.innerHTML = `
  <p>这是一个 Win98 风格窗口</p>
`;

    /*
    【基础心理轴】（长期、连续）
    - Depression   抑郁        0 ~ 1
    - Anxiety      焦虑        0 ~ 1
    - Stress       压力        0 ~ 1

    【状态破坏轴】（短期、事件触发）
    - Confusion    认知混乱    0 ~ 1
    - Hallucination 幻觉感知  0 ~ 1
    */

    let healthBar = new HealthBar(playerInfo);
    await healthBar.init();

    let startPage = new StartPage();
    let hubPage = new HubPage(playerInfo);
    await hubPage.init();

    let settingBtn = new Button({
        name: 'Setting',
        position: { x: 1600, y: 50 },
        
        text: 'Config',
        callback: () => {
           dialog.show();
        }
    });

    
    const dialog = new DialogBox(
    'The quick brown fox jumps over the lazy dog\nThe quick brown fox jumps over the lazy dog'
    );

    await dialog.init();

    dialog.x = app.screen.width / 2;
    dialog.y = app.screen.height;

    const filterManager = new Filter(playerInfo);

    //app.ticker.add(() => {
    //    const currentFilters = filterManager.generateMoodFilters();
    //    app.stage.filters = currentFilters;
    //});

    app.stage.addChild(healthBar);
    app.stage.addChild(hubPage);
    app.stage.addChild(settingBtn);
    app.stage.addChild(dialog);
    }

main();