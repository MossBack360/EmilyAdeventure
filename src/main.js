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

    let taskBar = new TaskBar('taskBar1');
    await taskBar.init();
    
    let emilyPanel = new EmilyPanel("panel1",playerInfo)
    await emilyPanel.init();

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


    app.stage.addChild(hubPage);
    //app.stage.addChild(startPage)
    app.stage.addChild(settingBtn);
    app.stage.addChild(emilyPanel)
    app.stage.addChild(taskBar);
    app.stage.addChild(dialog);
    
    //app.stage.addChild(healthBar);

    // 这里是测试物理引擎的代码

    const testS = PIXI.Sprite.from('asset/test/startBtnUp.png')
    app.stage.addChild(testS);



    let physics = new Physics(app);
    let ground= physics.Bodies.rectangle(0, 0, 1920, 54);
    physics.addStatic("ground",ground);
    //physics.bind("ground",groundS);

    //ground.position.x=1920/2;
    //ground.position.y=-999;
    physics.Body.setPosition(ground,{x:1920/2,y:1030+50/2})

    const vertices1 = [
    { x: 0, y: 0 },
    { x: 281, y: 0 },
    { x: 281, y: 121 },
    { x: 0, y: 121 },
    ];


    let test = physics.Bodies.fromVertices(0, 0, vertices1, { restitution: 0.5 });
    test.position.x=0;
    test.position.y=0;
    let world = physics.world;
    //Matter.World.add(world, test);
    
    physics.add("test",test);
    physics.bind("test",testS);
    
    physics.debugRun();
    console.log(physics.engine.world.bodies); 

    app.ticker.add(() => {physics.update()})

    
}
main();