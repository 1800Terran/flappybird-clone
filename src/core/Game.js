class Game {
    constructor() {
        this.renderer = new CanvasRenderer('gameCanvas');
        this.inputHandler = new InputHandler();
        
        this.bird = new Bird();
        this.pipeManager = new PipeManager();
        this.background = new Background();
        this.scoreManager = new ScoreManager();
        
        this.gameState = 'waiting'; // waiting, playing, gameOver
        this.lastTime = 0;
        this.gameLoop = null;
        
        this.jumpPressed = false;
    }
    
    start() {
        this.gameLoop = requestAnimationFrame((timestamp) => this.update(timestamp));
    }
    
    update(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        // Handle input
        this.handleInput();
        
        // Update game based on state
        switch (this.gameState) {
            case 'waiting':
                this.updateWaiting();
                break;
            case 'playing':
                this.updatePlaying();
                break;
            case 'gameOver':
                this.updateGameOver();
                break;
        }
        
        // Render everything
        this.render();
        
        // Continue game loop
        this.gameLoop = requestAnimationFrame((timestamp) => this.update(timestamp));
    }
    
    handleInput() {
        const jumpPressed = this.inputHandler.isJumpPressed();
        
        // Only trigger jump on press (not hold)
        if (jumpPressed && !this.jumpPressed) {
            this.onJump();
        }
        
        this.jumpPressed = jumpPressed;
    }
    
    onJump() {
        switch (this.gameState) {
            case 'waiting':
                this.startGame();
                break;
            case 'playing':
                this.bird.jump();
                break;
            case 'gameOver':
                this.restart();
                break;
        }
    }
    
    updateWaiting() {
        // Bird gently bobs up and down
        this.bird.y = CONFIG.BIRD.Y + Math.sin(Date.now() * 0.005) * 10;
    }
    
    updatePlaying() {
        // Update bird
        this.bird.update();
        
        // Update pipes
        this.pipeManager.update();
        
        // Check for collisions
        if (this.pipeManager.checkCollision(this.bird) || 
            this.bird.y + this.bird.height >= CONFIG.CANVAS.HEIGHT - CONFIG.BACKGROUND.GROUND_HEIGHT) {
            this.gameOver();
            return;
        }
        
        // Check for score
        const scoreIncrement = this.pipeManager.checkScore(this.bird);
        if (scoreIncrement > 0) {
            this.scoreManager.addScore(scoreIncrement);
        }
        
        // Update background
        this.background.update();
    }
    
    updateGameOver() {
        // Game is paused, waiting for restart
    }
    
    startGame() {
        this.gameState = 'playing';
        this.bird.jump(); // Initial jump to start
    }
    
    gameOver() {
        this.gameState = 'gameOver';
    }
    
    restart() {
        this.gameState = 'waiting';
        this.bird.reset();
        this.pipeManager.reset();
        this.scoreManager.reset();
    }
    
    render() {
        // Clear canvas
        this.renderer.clear();
        
        // Draw background
        this.background.draw(this.renderer);
        
        // Draw pipes
        this.pipeManager.draw(this.renderer);
        
        // Draw bird
        this.bird.draw(this.renderer);
        
        // Draw score
        if (this.gameState === 'playing') {
            this.scoreManager.draw(this.renderer);
        }
        
        // Draw start message
        if (this.gameState === 'waiting') {
            this.renderer.drawText(
                'Press SPACE to start',
                CONFIG.CANVAS.WIDTH / 2,
                CONFIG.CANVAS.HEIGHT / 2,
                '#FFF',
                '24px Arial'
            );
        }
        
        // Draw game over screen
        if (this.gameState === 'gameOver') {
            this.scoreManager.drawGameOver(this.renderer);
        }
    }
    
    stop() {
        if (this.gameLoop) {
            cancelAnimationFrame(this.gameLoop);
            this.gameLoop = null;
        }
    }
}