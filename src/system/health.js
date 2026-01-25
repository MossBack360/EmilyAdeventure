class Health{
    constructor(playerInfo, healthDecayInterval=1000,decayAmount=1) {
        this.playerInfo = playerInfo;
        this.healthDecayInterval = healthDecayInterval;
        this.decayAmount = decayAmount;
    }

    updateHealth(){
        let lastUpdateTime = Date.now(); 
        const healthDecayInterval = this.healthDecayInterval;
        if ((lastUpdateTime - lastUpdateTime) / 1000 >= healthDecayInterval) { // 转成秒
            //console.log("3 秒到了！");
            this.playerInfo.health -= this.decayAmount; // 调用你的函数
            lastUpdateTime = Date.now(); // 更新上次触发时间

            if (this.playerInfo.health <= 0) {
                this.playerInfo.alive = false;
            }
        }
    }

}