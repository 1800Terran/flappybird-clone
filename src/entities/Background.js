class Background {
    constructor() {
        this.skyColor = CONFIG.BACKGROUND.COLOR;
        this.groundColor = CONFIG.BACKGROUND.GROUND_COLOR;
        this.groundHeight = CONFIG.BACKGROUND.GROUND_HEIGHT;
    }
    
    update() {
        // Background is static for now, but could add scrolling clouds etc.
    }
    
    draw(renderer) {
        // Sky
        renderer.drawRect(
            0, 
            0, 
            CONFIG.CANVAS.WIDTH, 
            CONFIG.CANVAS.HEIGHT - this.groundHeight, 
            this.skyColor
        );
        
        // Ground
        renderer.drawRect(
            0, 
            CONFIG.CANVAS.HEIGHT - this.groundHeight, 
            CONFIG.CANVAS.WIDTH, 
            this.groundHeight, 
            this.groundColor
        );
        
        // Ground pattern (optional visual enhancement)
        this.drawGroundPattern(renderer);
    }
    
    drawGroundPattern(renderer) {
        const patternHeight = 5;
        const darkGroundColor = '#CD853F';
        
        // Draw darker stripe on top of ground
        renderer.drawRect(
            0,
            CONFIG.CANVAS.HEIGHT - this.groundHeight,
            CONFIG.CANVAS.WIDTH,
            patternHeight,
            darkGroundColor
        );
    }
}