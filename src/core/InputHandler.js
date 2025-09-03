class InputHandler {
    constructor() {
        this.keys = {};
        this.mousePressed = false;
        this.touchPressed = false;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
        
        // Mouse events
        document.addEventListener('mousedown', (e) => {
            this.mousePressed = true;
        });
        
        document.addEventListener('mouseup', (e) => {
            this.mousePressed = false;
        });
        
        // Touch events for mobile
        document.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.touchPressed = true;
        });
        
        document.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.touchPressed = false;
        });
    }
    
    isJumpPressed() {
        return this.keys['Space'] || this.mousePressed || this.touchPressed;
    }
    
    resetJump() {
        this.keys['Space'] = false;
        this.mousePressed = false;
        this.touchPressed = false;
    }
}