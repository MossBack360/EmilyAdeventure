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
        alive : true
        


    }

    /*
    【基础心理轴】（长期、连续）
    - Depression   抑郁        0 ~ 1
    - Anxiety      焦虑        0 ~ 1
    - Stress       压力        0 ~ 1

    【状态破坏轴】（短期、事件触发）
    - Confusion    认知混乱    0 ~ 1
    - Hallucination 幻觉感知  0 ~ 1
    */

    let healthBar = new HealthBar({x: 43, y: 133}, playerInfo);
    let startPage = new StartPage(playerInfo);

    const settingBtn = new Button({
        name: 'Setting',
        position: { x: 1600, y: 50 },
        
        text: 'Config',
        callback: () => {
            console.log('Setting');
        },
        style: 'classic'
    });


    


    const filterManager = new Filter(playerInfo);

    //app.ticker.add(() => {
    //    const currentFilters = filterManager.generateMoodFilters();
    //    app.stage.filters = currentFilters;
    //});

    healthBar.show();
    startPage.show();
    //app.stage.addChild(startBtn)
    app.stage.addChild(settingBtn);
}

main();