class Filter {
    constructor(playerInfo) {
        this.playerInfo = playerInfo;

        // ⚡ 建议这里创建一次滤镜实例，避免每帧 new，提高性能
        this.depressionFilter = new PIXI.filters.ColorMatrixFilter();
        this.vignette = new PIXI.filters.GlowFilter({ color: 0x000000, outerStrength: 0, distance: 200 });

        this.oldFilm = new PIXI.filters.ColorMatrixFilter();
        //this.multiColor = new PIXI.filters.MultiColorReplaceFilter({
        //    replaceColors: [{ from: 0xffffff, to: 0xffeedd, tolerance: 10}]
        //});

        this.zoomBlur = new PIXI.filters.ZoomBlurFilter();

        this.crt = new PIXI.filters.CRTFilter();
        this.glitch = new PIXI.filters.GlitchFilter();

        this.bloom = new PIXI.filters.BloomFilter();
        this.adjust = new PIXI.filters.AdjustmentFilter();
        this.rgb = new PIXI.filters.RGBSplitFilter();
    }

    generateMoodFilters() {
        const { playerInfo } = this;
        const filters = [];

        // 1️⃣ 抑郁 → 去饱和 + 暗角
        if (playerInfo.Depression > 0) {
            this.depressionFilter.desaturate(playerInfo.Depression / 100);
            //filters.push(this.depressionFilter);

            this.vignette.outerStrength = playerInfo.Depression / 20;
            filters.push(this.vignette);
        }

        // 2️⃣ 焦虑 → old film + MultiColorReplaceFilter 超过50
       /* if (playerInfo.Anxiety > 0) {
            this.oldFilm.greyscale(playerInfo.Anxiety / 100 * 0.5);
            this.oldFilm.contrast(1 + playerInfo.Anxiety / 200);
            filters.push(this.oldFilm);

            if (playerInfo.Anxiety > 50) {
                this.multiColor.replaceColors[0].tolerance = playerInfo.Anxiety / 50;
                filters.push(this.multiColor);
            }
        }*/

        // 3️⃣ 压力 → ZoomBlur + 心跳收缩
        if (playerInfo.Stress > 0) {
            this.zoomBlur.strength = playerInfo.Stress / 50;
            const scale = 1 + Math.sin(performance.now() / 200) * (playerInfo.Stress / 300);
            playerInfo.app.stage.scale.set(scale);
            filters.push(this.zoomBlur);
        } else {
            playerInfo.app.stage.scale.set(1);
        }

        // 4️⃣ 混乱 → crt + glitch
        if (playerInfo.Confusion > 0) {
            this.crt.curvature = playerInfo.Confusion / 200;
            this.crt.lineWidth = playerInfo.Confusion / 200;
            filters.push(this.crt);

            this.glitch.slices = Math.floor(playerInfo.Confusion / 10);
            filters.push(this.glitch);
        }

        // 5️⃣ 幻觉 → Bloom + Adjustment + RGBSplit
        if (playerInfo.Hallucination > 0) {
            this.bloom.bloom = playerInfo.Hallucination / 20;
            this.adjust.brightness = 1 + playerInfo.Hallucination / 200;
            this.rgb.red = playerInfo.Hallucination / 200;
            this.rgb.green = -playerInfo.Hallucination / 200;
            this.rgb.blue = playerInfo.Hallucination / 200;
            filters.push(this.bloom, this.adjust, this.rgb);
        }

        return filters;
    }
}
