class ScoreManager {
    constructor() {
        this.currentScore = 0;
        this.highScore = this.loadHighScore();
        this.scoreColor = '#FFF';
        this.scoreFont = '32px Arial';
    }
    
    addScore(points = 1) {
        this.currentScore += points;
        
        // Update high score if current score exceeds it
        if (this.currentScore > this.highScore) {
            this.highScore = this.currentScore;
            this.saveHighScore();
        }
    }
    
    reset() {
        this.currentScore = 0;
    }
    
    getCurrentScore() {
        return this.currentScore;
    }
    
    getHighScore() {
        return this.highScore;
    }
    
    draw(renderer) {
        // Current score (top center)
        renderer.drawText(
            this.currentScore.toString(),
            CONFIG.CANVAS.WIDTH / 2,
            50,
            this.scoreColor,
            this.scoreFont
        );
        
        // High score (top right)
        renderer.drawText(
            `Best: ${this.highScore}`,
            CONFIG.CANVAS.WIDTH - 10,
            30,
            this.scoreColor,
            '16px Arial'
        );
    }
    
    drawGameOver(renderer) {
        const centerX = CONFIG.CANVAS.WIDTH / 2;
        const centerY = CONFIG.CANVAS.HEIGHT / 2;
        
        // Game Over text
        renderer.drawText(
            'GAME OVER',
            centerX,
            centerY - 60,
            '#FF0000',
            '36px Arial'
        );
        
        // Final score
        renderer.drawText(
            `Score: ${this.currentScore}`,
            centerX,
            centerY - 20,
            this.scoreColor,
            '24px Arial'
        );
        
        // High score
        renderer.drawText(
            `High Score: ${this.highScore}`,
            centerX,
            centerY + 20,
            this.scoreColor,
            '20px Arial'
        );
        
        // Restart instruction
        renderer.drawText(
            'Press SPACE to restart',
            centerX,
            centerY + 60,
            '#FFD700',
            '18px Arial'
        );
    }
    
    saveHighScore() {
        try {
            localStorage.setItem('flappybird_highscore', this.highScore.toString());
        } catch (e) {
            console.warn('Could not save high score to localStorage');
        }
    }
    
    loadHighScore() {
        try {
            const saved = localStorage.getItem('flappybird_highscore');
            return saved ? parseInt(saved, 10) : 0;
        } catch (e) {
            console.warn('Could not load high score from localStorage');
            return 0;
        }
    }
    
    isNewHighScore() {
        return this.currentScore === this.highScore && this.currentScore > 0;
    }
}