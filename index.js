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

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function setNewGame() {
        targetColor = getRandomColor();
        colorBox.style.backgroundColor = targetColor;
        const colors = Array.from({ length: 6 }, () => getRandomColor());
        const randomIndex = Math.floor(Math.random() * 6);
        colors[randomIndex] = targetColor;

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