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
        
        // Animation properties
        this.wingFlap = 0;
        this.rotation = 0;
        this.animationSpeed = 0.3;
    }
    
    update() {
        // Apply gravity
        this.velocity += this.gravity;
        this.y += this.velocity;
        
        // Update animation
        this.wingFlap += this.animationSpeed;
        
        // Rotation based on velocity (diving/climbing)
        this.rotation = Math.max(-0.5, Math.min(0.5, this.velocity * 0.05));
        
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
        const ctx = renderer.ctx;
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(this.rotation);
        
        // Draw bird body (oval)
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.width/2, this.height/2 - 2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw wing (animated)
        const wingOffset = Math.sin(this.wingFlap) * 3;
        ctx.fillStyle = '#FFA500';
        ctx.beginPath();
        ctx.ellipse(-2, wingOffset, this.width/3, this.height/3, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw beak
        ctx.fillStyle = '#FF8C00';
        ctx.beginPath();
        ctx.moveTo(this.width/2 - 2, -2);
        ctx.lineTo(this.width/2 + 4, 0);
        ctx.lineTo(this.width/2 - 2, 2);
        ctx.closePath();
        ctx.fill();
        
        // Draw eye
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(2, -3, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Eye highlight
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(3, -4, 1, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
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