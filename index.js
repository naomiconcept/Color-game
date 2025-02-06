document.addEventListener('DOMContentLoaded', () => {
    const colorBox = document.querySelector('[data-testid="colorBox"]');
    const colorOptions = document.querySelectorAll('[data-testid="colorOption"]');
    const gameStatus = document.querySelector('[data-testid="gameStatus"]');
    const scoreDisplay = document.querySelector('[data-testid="score"]');
    const newGameButton = document.querySelector('[data-testid="newGameButton"]');
    let score = 0;
    let targetColor;

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function getSimilarColor(baseColor) {
        const variation = 30; // Adjust this value to control the similarity
        let color = '#';
        for (let i = 1; i < 7; i += 2) {
            let baseComponent = parseInt(baseColor.substr(i, 2), 16);
            let newComponent = Math.min(255, Math.max(0, baseComponent + Math.floor(Math.random() * variation - variation / 2)));
            color += newComponent.toString(16).padStart(2, '0');
        }
        return color;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function setNewGame() {
        targetColor = getRandomColor();
        colorBox.style.backgroundColor = targetColor;
        const colors = [targetColor];
        for (let i = 1; i < 6; i++) {
            colors.push(getSimilarColor(targetColor));
        }

        shuffle(colors); // Shuffle the colors array

        colorOptions.forEach((option, index) => {
            option.style.backgroundColor = colors[index];
            option.onclick = () => checkGuess(colors[index]);
        });

        gameStatus.textContent = ''; // Clear the game status message
    }

    function checkGuess(color) {
        if (color === targetColor) {
            gameStatus.textContent = 'Correct!';
            score++;
            scoreDisplay.textContent = score;
            alert('Correct, you just earned a point!');
            setNewGame(); // Change the target color to another one
        } else {
            gameStatus.textContent = 'Wrong! Try again.';
        }
    }

    newGameButton.addEventListener('click', setNewGame);

    setNewGame();
});
