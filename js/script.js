// **Consegna**
// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.


// Collegare il bottone Play in modo che compaia la griglia quando viene premuto
const grid = document.querySelector(".grid");
const playBtn = document.querySelector(".play-btn");

playBtn.addEventListener("click", function() {
    grid.innerHTML = "";
    grid.classList.add("display");

    let squareNumbers = minMaxNumber(1, 100);
    let difficultySquares = 100;
    let difficultyInput = document.getElementById("difficulties");
    
    // Creare gli square da inserire nella griglia in base alla difficoltà scelta dall'utente e creare il contatore di numeri
    for (let i = 0; i < difficultySquares; i++) {
        let squares = squareGenerator(squareNumbers[i]);
        grid.append(squares);
        if (difficultyInput.value === "medium") {
            squareNumbers = minMaxNumber(1, 81);
            difficultySquares = 81;
            squares.classList.add("medium");
        } else if (difficultyInput.value === "hard") {
            squareNumbers = minMaxNumber(1, 49);
            difficultySquares = 49;
            squares.classList.add("hard");
        } else {
            squareNumbers;
            difficultySquares;
            squares.classList.add("easy")

            // Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emette un messaggio in console con il numero della cella cliccata.
        }
        squares.addEventListener("click", function() {
            squares.classList.toggle("light-blue");
            console.log(`${squareNumbers[i]}`);
        })
    }
})

// FUNCTIONS
// Funzione per creare minimo e massimo
function minMaxNumber (min, max) {
    let numbersArray = [];
    for (let i = min; i <= max; i++) {
        numbersArray.push(i);
    }
    return numbersArray;
}

// Funzione per creare squares con dentro i numeri
function squareGenerator (insideNumber) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.innerHTML = insideNumber;
    return square;
}
