let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector("#submitGuess");
const guessField = document.querySelector("#guessField");

let guessCount = 1;
let resetButton; // declare globally so both functions can use it

function checkGuess() {
    const userGuess = Number(guessField.value);

    if (guessCount === 1) {
        guesses.textContent = "Previous guesses: ";
    }
    guesses.textContent += `${userGuess} `;

    if (userGuess === randomNumber) {
        lastResult.textContent = "Congratulations! You got it right!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver(); // ✅ call here when guessed right
    } else if (guessCount === 10) {
        lastResult.textContent = "!!! GAME OVER !!!";
        lowOrHi.textContent = "";
        setGameOver(); // ✅ call here when guesses run out
    } else {
        lastResult.textContent = "Wrong!";
        lastResult.style.backgroundColor = "red";
        if (userGuess > randomNumber) {
            lowOrHi.textContent = "Last guess was too high!";
        } else {
            lowOrHi.textContent = "Last guess was too low!";
        }
    }

    guessCount++;
    guessField.value = "";
    guessField.focus();
}

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    const resetParas = document.querySelectorAll(".resultParas p");
    const container = document.querySelector(".container");
    resetButton.classList.add("bg-blue-500", "text-white", "px-4", "py-2", "rounded", "hover:bg-blue-600");
    resetButton.textContent = "Start new game";
    
    container.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}

function resetGame() {
    guessCount = 1;

    const resetParas = document.querySelectorAll(".resultParas p");
    for (const resetPara of resetParas) {
        resetPara.textContent = "";
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    lastResult.style.backgroundColor = "white";

    randomNumber = Math.floor(Math.random() * 100) + 1;
}

// ✅ Add event listener at the bottom
guessSubmit.addEventListener("click", checkGuess);
