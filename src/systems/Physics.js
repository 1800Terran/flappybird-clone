class Physics {
    static rectanglesCollide(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    static pointInRectangle(point, rect) {
        return point.x >= rect.x &&
               point.x <= rect.x + rect.width &&
               point.y >= rect.y &&
               point.y <= rect.y + rect.height;
    }
    
    static circleRectangleCollision(circle, rect) {
        // Find the closest point on the rectangle to the circle center
        const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
        const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
        
        // Calculate distance between circle center and closest point
        const distanceX = circle.x - closestX;
        const distanceY = circle.y - closestY;
        const distanceSquared = distanceX * distanceX + distanceY * distanceY;
        
        return distanceSquared <= circle.radius * circle.radius;
    }
    
    static isOutOfBounds(object, bounds = null) {
        const gameBounds = bounds || {
            x: 0,
            y: 0,
            width: CONFIG.CANVAS.WIDTH,
            height: CONFIG.CANVAS.HEIGHT - CONFIG.BACKGROUND.GROUND_HEIGHT
        };
        
        return object.x + object.width < gameBounds.x ||
               object.x > gameBounds.x + gameBounds.width ||
               object.y + object.height < gameBounds.y ||
               object.y > gameBounds.y + gameBounds.height;
    }
    
    static clampPosition(object, bounds = null) {
        const gameBounds = bounds || {
            x: 0,
            y: 0,
            width: CONFIG.CANVAS.WIDTH,
            height: CONFIG.CANVAS.HEIGHT - CONFIG.BACKGROUND.GROUND_HEIGHT
        };
        
        if (object.x < gameBounds.x) {
            object.x = gameBounds.x;
        }
        if (object.x + object.width > gameBounds.x + gameBounds.width) {
            object.x = gameBounds.x + gameBounds.width - object.width;
        }
        if (object.y < gameBounds.y) {
            object.y = gameBounds.y;
        }
        if (object.y + object.height > gameBounds.y + gameBounds.height) {
            object.y = gameBounds.y + gameBounds.height - object.height;
        }
        
        return object;
    }
}