class CanvasRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.width = CONFIG.CANVAS.WIDTH;
        this.canvas.height = CONFIG.CANVAS.HEIGHT;
    }
    
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawRect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }
    
    drawCircle(x, y, radius, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawText(text, x, y, color = '#000', font = '24px Arial') {
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(text, x, y);
    }
    
    drawBackground() {
        // Sky
        this.drawRect(0, 0, CONFIG.CANVAS.WIDTH, CONFIG.CANVAS.HEIGHT - CONFIG.BACKGROUND.GROUND_HEIGHT, CONFIG.BACKGROUND.COLOR);
        
        // Ground
        this.drawRect(0, CONFIG.CANVAS.HEIGHT - CONFIG.BACKGROUND.GROUND_HEIGHT, CONFIG.CANVAS.WIDTH, CONFIG.BACKGROUND.GROUND_HEIGHT, CONFIG.BACKGROUND.GROUND_COLOR);
    }
}