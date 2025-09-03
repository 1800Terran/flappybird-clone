class Background {
    constructor() {
        this.skyColor = CONFIG.BACKGROUND.COLOR;
        this.groundColor = CONFIG.BACKGROUND.GROUND_COLOR;
        this.groundHeight = CONFIG.BACKGROUND.GROUND_HEIGHT;
        
        this.clouds = this.generateClouds();
        this.cloudSpeed = 0.2;
        this.time = 0;
    }
    
    update() {
        this.time += 0.02;
        
        // Move clouds
        this.clouds.forEach(cloud => {
            cloud.x -= this.cloudSpeed;
            if (cloud.x + cloud.width < 0) {
                cloud.x = CONFIG.CANVAS.WIDTH + Math.random() * 100;
            }
        });
    }
    
    generateClouds() {
        const clouds = [];
        for (let i = 0; i < 4; i++) {
            clouds.push({
                x: Math.random() * CONFIG.CANVAS.WIDTH,
                y: 50 + Math.random() * 150,
                width: 40 + Math.random() * 30,
                height: 20 + Math.random() * 15,
                opacity: 0.6 + Math.random() * 0.3
            });
        }
        return clouds;
    }
    
    draw(renderer) {
        const ctx = renderer.ctx;
        
        // Sky gradient
        const skyGradient = ctx.createLinearGradient(0, 0, 0, CONFIG.CANVAS.HEIGHT - this.groundHeight);
        skyGradient.addColorStop(0, '#87CEEB');
        skyGradient.addColorStop(0.7, '#B0E0E6');
        skyGradient.addColorStop(1, '#E0F6FF');
        
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, CONFIG.CANVAS.WIDTH, CONFIG.CANVAS.HEIGHT - this.groundHeight);
        
        // Sun
        this.drawSun(ctx);
        
        // Clouds
        this.drawClouds(ctx);
        
        // Ground
        this.drawGround(ctx);
        
        // Ground pattern
        this.drawGroundPattern(renderer);
    }
    
    drawSun(ctx) {
        const sunX = CONFIG.CANVAS.WIDTH - 80;
        const sunY = 80;
        const sunRadius = 30;
        
        // Sun rays
        ctx.strokeStyle = 'rgba(255, 255, 0, 0.6)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI * 2) / 8 + this.time;
            const rayLength = 20;
            ctx.beginPath();
            ctx.moveTo(
                sunX + Math.cos(angle) * (sunRadius + 5),
                sunY + Math.sin(angle) * (sunRadius + 5)
            );
            ctx.lineTo(
                sunX + Math.cos(angle) * (sunRadius + rayLength),
                sunY + Math.sin(angle) * (sunRadius + rayLength)
            );
            ctx.stroke();
        }
        
        // Sun glow
        const sunGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius + 10);
        sunGradient.addColorStop(0, '#FFFF00');
        sunGradient.addColorStop(0.7, '#FFD700');
        sunGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        
        ctx.fillStyle = sunGradient;
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunRadius + 10, 0, Math.PI * 2);
        ctx.fill();
        
        // Sun body
        ctx.fillStyle = '#FFFF00';
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    drawClouds(ctx) {
        this.clouds.forEach(cloud => {
            ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity})`;
            
            // Draw cloud as multiple circles
            const numCircles = 3;
            for (let i = 0; i < numCircles; i++) {
                const circleX = cloud.x + (i * cloud.width / numCircles);
                const circleY = cloud.y + Math.sin(this.time + i) * 2;
                const radius = cloud.height / 2 + Math.sin(this.time + i) * 2;
                
                ctx.beginPath();
                ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    }
    
    drawGround(ctx) {
        const groundY = CONFIG.CANVAS.HEIGHT - this.groundHeight;
        
        // Ground gradient
        const groundGradient = ctx.createLinearGradient(0, groundY, 0, CONFIG.CANVAS.HEIGHT);
        groundGradient.addColorStop(0, '#DEB887');
        groundGradient.addColorStop(0.3, '#D2B48C');
        groundGradient.addColorStop(1, '#CD853F');
        
        ctx.fillStyle = groundGradient;
        ctx.fillRect(0, groundY, CONFIG.CANVAS.WIDTH, this.groundHeight);
        
        // Grass texture
        ctx.fillStyle = '#8FBC8F';
        for (let x = 0; x < CONFIG.CANVAS.WIDTH; x += 8) {
            const grassHeight = 3 + Math.sin(x * 0.1) * 2;
            ctx.fillRect(x, groundY, 2, grassHeight);
        }
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