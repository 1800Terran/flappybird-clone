class Bird {
    constructor() {
        this.x = CONFIG.BIRD.X;
        this.y = CONFIG.BIRD.Y;
        this.width = CONFIG.BIRD.WIDTH;
        this.height = CONFIG.BIRD.HEIGHT;
        
        this.velocity = 0;
        this.gravity = CONFIG.BIRD.GRAVITY;
        this.jumpForce = CONFIG.BIRD.JUMP_FORCE;
        
        this.color = CONFIG.BIRD.COLOR;
    }
    
    update() {
        // Apply gravity
        this.velocity += this.gravity;
        this.y += this.velocity;
        
        // Prevent bird from going off screen
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
        
        // Ground collision
        if (this.y + this.height > CONFIG.CANVAS.HEIGHT - CONFIG.BACKGROUND.GROUND_HEIGHT) {
            this.y = CONFIG.CANVAS.HEIGHT - CONFIG.BACKGROUND.GROUND_HEIGHT - this.height;
            this.velocity = 0;
        }
    }
    
    jump() {
        this.velocity = this.jumpForce;
    }
    
    draw(renderer) {
        renderer.drawRect(this.x, this.y, this.width, this.height, this.color);
    }
    
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
    
    reset() {
        this.x = CONFIG.BIRD.X;
        this.y = CONFIG.BIRD.Y;
        this.velocity = 0;
    }
}