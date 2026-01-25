class Filter{

    constructor(playerInfo) {
        this.playerInfo = playerInfo;
    }

    function generateMoodFilters(playerInfo) {
    const filters = [];

    //  抑郁 → 去饱和 + 暗角
    if (playerInfo.Depression > 0) {
        const depressionFilter = new ColorMatrixFilter();
        // 去饱和程度根据数值决定
        depressionFilter.desaturate(playerInfo.Depression / 100);
        filters.push(depressionFilter);

        const vignette = new GlowFilter({
            color: 0x000000,
            outerStrength: playerInfo.Depression / 20, // 最大5
            distance: 200
        });
        filters.push(vignette);
    }

    //  焦虑 → old film + MultiColorReplaceFilter 超过50
    if (playerInfo.Anxiety > 0) {
        const oldFilm = new ColorMatrixFilter();
        oldFilm.greyscale(playerInfo.Anxiety / 100 * 0.5); // 轻微旧片感
        oldFilm.contrast(1 + playerInfo.Anxiety / 200);
        filters.push(oldFilm);

        if (playerInfo.Anxiety > 50) {
            const multiColor = new MultiColorReplaceFilter({
                replaceColors: [
                    { from: 0xffffff, to: 0xffeedd, tolerance: playerInfo.Anxiety / 50 }
                ]
            });
            filters.push(multiColor);
        }
    }

    //  压力 → ZoomBlur + 心跳收缩
    if (playerInfo.Stress > 0) {
        const zoomBlur = new ZoomBlurFilter();
        zoomBlur.strength = playerInfo.Stress / 50; // 越大越强
        // 心跳规律缩放效果
        const scale = 1 + Math.sin(performance.now() / 200) * (playerInfo.Stress / 300);
        playerInfo.app.stage.scale.set(scale);
        filters.push(zoomBlur);
    } else {
        playerInfo.app.stage.scale.set(1); // 恢复正常
    }

    //  混乱 → crt + glitch
    if (playerInfo.Confusion > 0) {
        const crt = new CRTFilter();
        crt.curvature = playerInfo.Confusion / 200;
        crt.lineWidth = playerInfo.Confusion / 200;
        filters.push(crt);

        const glitch = new GlitchFilter();
        glitch.slices = Math.floor(playerInfo.Confusion / 10);
        filters.push(glitch);
    }

    //  幻觉 → Bloom + Adjustment + RGBSplit
    if (playerInfo.Hallucination > 0) {
        const bloom = new BloomFilter(playerInfo.Hallucination / 20);
        const adjust = new AdjustmentFilter();
        adjust.brightness = 1 + playerInfo.Hallucination / 200; // 过曝
        const rgb = new RGBSplitFilter();
        rgb.red = playerInfo.Hallucination / 200;
        rgb.green = -playerInfo.Hallucination / 200;
        rgb.blue = playerInfo.Hallucination / 200;
        filters.push(bloom, adjust, rgb);
    }

    return filters;
}

}