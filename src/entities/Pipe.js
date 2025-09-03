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
        // Top pipe
        if (this.topHeight > 0) {
            renderer.drawRect(this.x, 0, this.width, this.topHeight, this.color);
        }
        
        // Bottom pipe
        if (this.bottomHeight > 0) {
            renderer.drawRect(this.x, this.bottomY, this.width, this.bottomHeight, this.color);
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