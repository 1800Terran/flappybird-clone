class Pipe {
    constructor(x, gapY) {
        this.x = x;
        this.width = CONFIG.PIPE.WIDTH;
        this.speed = CONFIG.PIPE.SPEED;
        this.color = CONFIG.PIPE.COLOR;
        
        this.gapY = gapY;
        this.gapSize = CONFIG.PIPE.GAP;
        
        // Top pipe
        this.topHeight = this.gapY - this.gapSize / 2;
        
        // Bottom pipe
        this.bottomY = this.gapY + this.gapSize / 2;
        this.bottomHeight = CONFIG.CANVAS.HEIGHT - CONFIG.BACKGROUND.GROUND_HEIGHT - this.bottomY;
        
        this.passed = false;
    }
    
    update() {
        this.x -= this.speed;
    }
    
    draw(renderer) {
        const ctx = renderer.ctx;
        
        // Top pipe
        if (this.topHeight > 0) {
            this.drawPipe(ctx, this.x, 0, this.width, this.topHeight, true);
        }
        
        // Bottom pipe  
        if (this.bottomHeight > 0) {
            this.drawPipe(ctx, this.x, this.bottomY, this.width, this.bottomHeight, false);
        }
    }
    
    drawPipe(ctx, x, y, width, height, isTop) {
        // Main pipe body
        const gradient = ctx.createLinearGradient(x, 0, x + width, 0);
        gradient.addColorStop(0, '#2E8B57');
        gradient.addColorStop(0.3, '#228B22');
        gradient.addColorStop(0.7, '#228B22');
        gradient.addColorStop(1, '#006400');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, width, height);
        
        // Pipe cap (wider top/bottom)
        const capHeight = 20;
        const capWidth = width + 8;
        const capX = x - 4;
        
        let capY;
        if (isTop) {
            capY = y + height - capHeight;
        } else {
            capY = y;
        }
        
        // Cap gradient
        const capGradient = ctx.createLinearGradient(capX, 0, capX + capWidth, 0);
        capGradient.addColorStop(0, '#32CD32');
        capGradient.addColorStop(0.5, '#228B22');
        capGradient.addColorStop(1, '#006400');
        
        ctx.fillStyle = capGradient;
        ctx.fillRect(capX, capY, capWidth, capHeight);
        
        // Highlight on left side
        ctx.fillStyle = 'rgba(144, 238, 144, 0.5)';
        ctx.fillRect(x, y, 3, height);
        ctx.fillRect(capX, capY, 3, capHeight);
        
        // Shadow on right side
        ctx.fillStyle = 'rgba(0, 100, 0, 0.3)';
        ctx.fillRect(x + width - 3, y, 3, height);
        ctx.fillRect(capX + capWidth - 3, capY, 3, capHeight);
        
        // Decorative stripes
        ctx.strokeStyle = '#006400';
        ctx.lineWidth = 1;
        for (let i = 0; i < height; i += 15) {
            ctx.beginPath();
            ctx.moveTo(x, y + i);
            ctx.lineTo(x + width, y + i);
            ctx.stroke();
        }
    }
    
    getBounds() {
        return {
            top: {
                x: this.x,
                y: 0,
                width: this.width,
                height: this.topHeight
            },
            bottom: {
                x: this.x,
                y: this.bottomY,
                width: this.width,
                height: this.bottomHeight
            }
        };
    }
    
    isOffScreen() {
        return this.x + this.width < 0;
    }
    
    hasPassedBird(birdX) {
        return !this.passed && this.x + this.width < birdX;
    }
    
    markAsPassed() {
        this.passed = true;
    }
}

class PipeManager {
    constructor() {
        this.pipes = [];
        this.lastPipeX = CONFIG.CANVAS.WIDTH;
    }
    
    update() {
        // Update existing pipes
        this.pipes.forEach(pipe => pipe.update());
        
        // Remove off-screen pipes
        this.pipes = this.pipes.filter(pipe => !pipe.isOffScreen());
        
        // Add new pipes
        if (this.pipes.length === 0 || this.lastPipeX - this.pipes[this.pipes.length - 1].x >= CONFIG.PIPE.SPAWN_DISTANCE) {
            this.addPipe();
        }
    }
    
    addPipe() {
        const minGapY = CONFIG.PIPE.GAP / 2 + 50;
        const maxGapY = CONFIG.CANVAS.HEIGHT - CONFIG.BACKGROUND.GROUND_HEIGHT - CONFIG.PIPE.GAP / 2 - 50;
        const gapY = Math.random() * (maxGapY - minGapY) + minGapY;
        
        const newPipe = new Pipe(CONFIG.CANVAS.WIDTH, gapY);
        this.pipes.push(newPipe);
        this.lastPipeX = CONFIG.CANVAS.WIDTH;
    }
    
    draw(renderer) {
        this.pipes.forEach(pipe => pipe.draw(renderer));
    }
    
    checkCollision(bird) {
        for (let pipe of this.pipes) {
            const bounds = pipe.getBounds();
            const birdBounds = bird.getBounds();
            
            // Check collision with top pipe
            if (this.rectanglesCollide(birdBounds, bounds.top)) {
                return true;
            }
            
            // Check collision with bottom pipe
            if (this.rectanglesCollide(birdBounds, bounds.bottom)) {
                return true;
            }
        }
        return false;
    }
    
    rectanglesCollide(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    checkScore(bird) {
        let scoreIncrement = 0;
        this.pipes.forEach(pipe => {
            if (pipe.hasPassedBird(bird.x)) {
                pipe.markAsPassed();
                scoreIncrement++;
            }
        });
        return scoreIncrement;
    }
    
    reset() {
        this.pipes = [];
        this.lastPipeX = CONFIG.CANVAS.WIDTH;
    }
}