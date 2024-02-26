// project1/snake.js

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('snake-game-canvas');    // Where does the game go/get painted
    const ctx = canvas.getContext('2d');

    // Initial values
    let snake = [];
    const tileSize = 20;
    let direction = 'right';
    let gameInterval;

    // THE GAME
    function startGame() {
        snake = [{ x: 10, y: 10 }];
        direction = 'right';

        // Clear canvas and start game loop
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameInterval = setInterval(gameLoop, 120);
        
        // Hide start button and retry button
        startButton.style.display = 'none';
        retryButton.style.display = 'none';

        // Hide Game Over message
        gameOverMessage.style.display = 'none';
    }

    function endGame() {
        // Stop game loop
        clearInterval(gameInterval);

        // Display retry button and Game Over message
        retryButton.style.display = 'block';
        gameOverMessage.style.display = 'block';
    }

    function gameLoop() {
        moveSnake();
        draw();
    }

    // THE SNAKE
    function moveSnake() {
        const head = { ...snake[0] };

        switch (direction) {
            case 'up':
                head.y -= 1;
                break;
            case 'down':
                head.y += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
        }

        snake.unshift(head);

        // Check if snake collides with boundaries or itself
        if (head.x < 0 || head.x >= canvas.width / tileSize || head.y < 0 || head.y >= canvas.height / tileSize || checkCollision()) {
            endGame();
        } else {
            // Remove tail
            if (snake.length > 1) {
                snake.pop();
            }
        }
    }

    function checkCollision() {
        const head = snake[0];
        return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        snake.forEach(segment => {
            ctx.fillStyle = '#000';
            ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
        });
    }

    document.addEventListener('keydown', (event) => {
        // Player controls
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
        }
    });

    // THE BUTTONS
    function createButton(id, text, action) {
        const button = document.createElement('button');
        button.id = id;
        button.innerText = text;
        button.style.position = 'absolute';
        button.style.top = '50%';
        button.style.left = '50%';
        button.style.transform = 'translate(-50%, -50%)';
        button.style.padding = '10px';
        button.style.borderRadius = '10px';
        button.addEventListener('click', action);
        document.body.appendChild(button);
        return button;
    }

    // Create Game Over message
    const gameOverMessage = document.createElement('div');
    gameOverMessage.innerText = 'Game Over';
    gameOverMessage.style.position = 'absolute';
    gameOverMessage.style.top = '50%';
    gameOverMessage.style.left = '50%';
    gameOverMessage.style.transform = 'translate(-50%, -300%)';
    gameOverMessage.style.fontSize = '24px';
    gameOverMessage.style.fontWeight = 'bold';
    gameOverMessage.style.color = '#f00';
    gameOverMessage.style.display = 'none';
    document.body.appendChild(gameOverMessage);

    const startButton = createButton('start-button', 'Start', startGame);
    const retryButton = createButton('retry-button', 'Retry', startGame);
    retryButton.style.display = 'none'; // Initially hide retry button

    // Initial setup: Show start button
    startButton.style.display = 'block';
});
